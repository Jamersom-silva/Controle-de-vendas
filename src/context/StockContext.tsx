import React, { createContext, useState, ReactNode } from 'react';

export type Product = { id: number; name: string; quantity: number };

type StockContextType = {
  products: Product[];
  addProduct: (name: string, quantity: number) => void;
  removeProduct: (name: string, quantity: number) => void;
  loadProducts: () => void;
};

export const StockContext = createContext<StockContextType>({} as StockContextType);

export const StockProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);

  const loadProducts = () => {
    // Como não tem DB, apenas mantém os produtos atuais
    setProducts([...products]);
  };

  const addProduct = (name: string, quantity: number) => {
    const existing = products.find(p => p.name === name);
    if (existing) {
      existing.quantity += quantity;
      setProducts([...products]);
    } else {
      const newProduct: Product = {
        id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
        name,
        quantity,
      };
      setProducts([...products, newProduct]);
    }
  };

  const removeProduct = (name: string, quantity: number) => {
    const existing = products.find(p => p.name === name);
    if (!existing) return;

    const newQty = existing.quantity - quantity;
    if (newQty > 0) {
      existing.quantity = newQty;
      setProducts([...products]);
    } else {
      setProducts(products.filter(p => p.name !== name));
    }
  };

  return (
    <StockContext.Provider value={{ products, addProduct, removeProduct, loadProducts }}>
      {children}
    </StockContext.Provider>
  );
};
