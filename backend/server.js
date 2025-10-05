const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());
app.use(cors());
const db = new sqlite3.Database('./data.sqlite');

db.serialize(()=>{
  db.run(`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT UNIQUE, password TEXT, recover_token TEXT, recover_exp INTEGER);`);
  db.run(`CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price REAL, stock INTEGER);`);
  db.run(`CREATE TABLE IF NOT EXISTS sales (id INTEGER PRIMARY KEY AUTOINCREMENT, date INTEGER, total REAL);`);
  db.run(`CREATE TABLE IF NOT EXISTS sale_items (id INTEGER PRIMARY KEY AUTOINCREMENT, sale_id INTEGER, product_id INTEGER, quantity INTEGER, price REAL);`);
});

app.post('/auth/register', async (req,res)=>{
  const { name,email,password } = req.body;
  if (!email || !password) return res.status(400).json({ error:'missing' });
  try{
    const hash = await bcrypt.hash(password, 10);
    db.run(`INSERT INTO users (name,email,password) VALUES (?,?,?)`, [name,email,hash], function(err){
      if (err) return res.status(400).json({ error: 'user exists' });
      res.json({ id: this.lastID, name, email });
    });
  }catch(e){ res.status(500).json({ error:'server' }); }
});

app.post('/auth/login', (req,res)=>{
  const { email,password } = req.body;
  db.get(`SELECT * FROM users WHERE email = ? LIMIT 1`, [email], async (err,row)=>{
    if (err) return res.status(500).json({ error:'db' });
    if (!row) return res.status(401).json({ error:'notfound' });
    const ok = await bcrypt.compare(password, row.password);
    if (!ok) return res.status(401).json({ error:'invalid' });
    res.json({ id: row.id, name: row.name, email: row.email });
  });
});

function makeToken(len=6){ const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; let s=''; for(let i=0;i<len;i++) s+=chars[Math.floor(Math.random()*chars.length)]; return s; }

const nodemailer = require('nodemailer');
app.post('/auth/recover', async (req,res)=>{

  const { email } = req.body;
  if (!email) return res.status(400).json({ error:'missing' });
  db.get(`SELECT * FROM users WHERE email = ?`, [email], (err,row)=>{
    if (err) return res.status(500).json({ error:'db' });
    if (!row) return res.status(404).json({ error:'notfound' });
    const token = makeToken(6);
// Configurações do Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER, // coloque seu email no .env
        pass: process.env.GMAIL_PASS  // use App Password se 2FA ativado
    }
});

    const exp = Date.now() + 1000 * 60 * 60;
    db.run(`UPDATE users SET recover_token = ?, recover_exp = ? WHERE email = ?`, [token, exp, email], async (e)=>{
    if (e) console.log(e);
    // enviar email
    try{
        await transporter.sendMail({
            from: process.env.GMAIL_USER,
            to: email,
            subject: 'Recuperação de senha - Sales Control',
            text: `Seu token de recuperação é: ${token}`
        });
        console.log('Email enviado para', email);
    }catch(err){ console.log('Falha ao enviar email', err); }
    res.json({ ok:true, token }); // ainda retorna token para testes
});

  });
});

app.post('/auth/reset', async (req,res)=>{
  const { email, token, newPassword } = req.body;
  if (!email || !token || !newPassword) return res.status(400).json({ error:'missing' });
  db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err,row)=>{
    if (err) return res.status(500).json({ error:'db' });
    if (!row) return res.status(404).json({ error:'notfound' });
    if (row.recover_token !== token || Date.now() > row.recover_exp) return res.status(400).json({ error:'invalid token' });
    const hash = await bcrypt.hash(newPassword, 10);
    db.run(`UPDATE users SET password = ?, recover_token = NULL, recover_exp = NULL WHERE email = ?`, [hash, email], (e)=>{ if (e) return res.status(500).json({ error:'db' }); res.json({ ok:true }); });
  });
});

app.post('/sync/push', (req,res)=>{
  const { users, products, sales } = req.body || {};
  if (users && Array.isArray(users)){
    users.forEach(u=>{ db.run(`INSERT OR IGNORE INTO users (name,email,password) VALUES (?,?,?)`, [u.name,u.email,u.password || '']); });
  }
  if (products && Array.isArray(products)){
    products.forEach(p=>{ db.run(`INSERT OR REPLACE INTO products (id,name,price,stock) VALUES (?,?,?,?)`, [p.id,p.name,p.price,p.stock]); });
  }
  if (sales && Array.isArray(sales)){
    sales.forEach(s=>{ db.run(`INSERT INTO sales (id,date,total) VALUES (?,?,?)`, [s.id,s.date,s.total]); if (s.items) s.items.forEach(it=>{ db.run(`INSERT INTO sale_items (sale_id,product_id,quantity,price) VALUES (?,?,?,?)`, [s.id,it.product_id,it.quantity,it.price]); }); });
  }
  res.json({ ok:true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log('Server running on port', PORT));
