import React, { createContext, useState, ReactNode } from "react";

export type User = {
  id: number;
  email: string;
};

type UserContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

export const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<{ id: number; email: string; password: string }[]>([]);

  const login = async (email: string, password: string) => {
    const existing = users.find(u => u.email === email && u.password === password);
    if (existing) {
      setUser({ id: existing.id, email: existing.email });
      return true;
    }
    return false;
  };

  const register = async (email: string, password: string) => {
    const exists = users.some(u => u.email === email);
    if (exists) return false;

    const newUser = { id: users.length + 1, email, password };
    setUsers([...users, newUser]);
    setUser({ id: newUser.id, email: newUser.email });
    return true;
  };

  const logout = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
};
