import React, { createContext, useState, useEffect, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import { initDB, findUserByEmail, createUser } from '../db';
import { BACKEND_URL } from '../config';
type User = { id:number; name:string; email:string };
export const AuthContext = createContext<any>(null);
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user,setUser] = useState<User|null>(null);
  const [loading,setLoading] = useState(true);
  useEffect(()=>{ (async ()=>{ await initDB(); const token = await SecureStore.getItemAsync('user_token'); if (token){ const local = await findUserByEmail(token); if (local) setUser({ id: local.id, name: local.name, email: local.email }); } setLoading(false); })(); }, []);
  async function login(email:string,password:string){
    try{
      const res = await fetch(`${BACKEND_URL}/auth/login`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email, password }) });
      if (res.ok){ const j = await res.json(); await SecureStore.setItemAsync('user_token', j.email); setUser({ id: j.id, name: j.name, email: j.email }); return true; }
    }catch(e){ console.log('backend login failed, fallback to local'); }
    const u = await findUserByEmail(email);
    if (u && u.password === password){ await SecureStore.setItemAsync('user_token', u.email); setUser({ id: u.id, name: u.name, email: u.email }); return true; }
    return false;
  }
  async function register(name:string,email:string,password:string){
    try{
      const res = await fetch(`${BACKEND_URL}/auth/register`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ name,email,password }) });
      if (res.ok){ const j = await res.json(); await SecureStore.setItemAsync('user_token', j.email); setUser({ id: j.id, name: j.name, email: j.email }); return true; }
    }catch(e){ console.log('backend register failed, saving locally'); }
    const created = await createUser({ name,email,password });
    if (created){ await SecureStore.setItemAsync('user_token', email); setUser({ id: created.id, name: created.name, email: created.email }); return true; }
    return false;
  }
  async function logout(){ await SecureStore.deleteItemAsync('user_token'); setUser(null); }
  return <AuthContext.Provider value={{ user, loading, login, register, logout }}>{children}</AuthContext.Provider>;
};
