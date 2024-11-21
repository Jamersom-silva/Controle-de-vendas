import * as SQLite from 'expo-sqlite';

let db;

// Função para abrir o banco de dados
async function openDatabase() {
  if (SQLite.openDatabase) {
    db = SQLite.openDatabase('vendas.db');
  } else {
    throw new Error('SQLite module is not available.');
  }
}

// Inicializar o banco de dados
export const initDB = async () => {
  await openDatabase();
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS vendas (id INTEGER PRIMARY KEY NOT NULL, produto TEXT, quantidade INTEGER, preco REAL, date TEXT);',
      [],
      () => { console.log('Tabela vendas criada com sucesso'); },
      (_, error) => { console.log('Erro ao criar tabela vendas:', error); }
    );
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS estoque (id INTEGER PRIMARY KEY NOT NULL, produto TEXT, quantidade INTEGER);',
      [],
      () => { console.log('Tabela estoque criada com sucesso'); },
      (_, error) => { console.log('Erro ao criar tabela estoque:', error); }
    );
  });
};

// Função para adicionar uma venda
export const addVenda = (produto, quantidade, preco) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO vendas (produto, quantidade, preco, date) VALUES (?, ?, ?, ?);',
        [produto, quantidade, preco, new Date().toISOString()],
        (_, result) => { resolve(result); },
        (_, error) => { reject(error); }
      );
    });
  });
};

// Função para listar todas as vendas
export const getVendas = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM vendas;',
        [],
        (_, result) => { resolve(result.rows._array); },
        (_, error) => { reject(error); }
      );
    });
  });
};

// Função para deletar uma venda
export const deleteVenda = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM vendas WHERE id = ?;',
        [id],
        (_, result) => { resolve(result); },
        (_, error) => { reject(error); }
      );
    });
  });
};

// Função para adicionar um item ao estoque
export const addEstoque = (produto, quantidade) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO estoque (produto, quantidade) VALUES (?, ?);',
        [produto, quantidade],
        (_, result) => { resolve(result); },
        (_, error) => { reject(error); }
      );
    });
  });
};

// Função para listar todo o estoque
export const getEstoque = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM estoque;',
        [],
        (_, result) => { resolve(result.rows._array); },
        (_, error) => { reject(error); }
      );
    });
  });
};

// Função para atualizar a quantidade de um item no estoque
export const updateEstoque = (id, quantidade) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE estoque SET quantidade = ? WHERE id = ?;',
        [quantidade, id],
        (_, result) => { resolve(result); },
        (_, error) => { reject(error); }
      );
    });
  });
};

// Função para deletar um item do estoque
export const deleteEstoque = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM estoque WHERE id = ?;',
        [id],
        (_, result) => { resolve(result); },
        (_, error) => { reject(error); }
      );
    });
  });
};
