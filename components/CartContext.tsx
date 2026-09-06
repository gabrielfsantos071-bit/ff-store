"use client";
import { createContext, useContext, useMemo, useState } from "react";

export type Product = {
  id: number; name: string; diamonds: string; price: number; badge?: string;
};

type CartItem = Product & { qty: number };

const CartContext = createContext<any>(null);

export function CartProvider({children}: {children: React.ReactNode}) {
  const [items, setItems] = useState<CartItem[]>([]);
  const add = (p: Product) => setItems(prev => {
    const found = prev.find(x => x.id === p.id);
    return found ? prev.map(x => x.id === p.id ? {...x, qty:x.qty+1} : x) : [...prev, {...p, qty:1}];
  });
  const remove = (id:number) => setItems(prev => prev.filter(x => x.id !== id));
  const subtotal = useMemo(() => items.reduce((s,x)=>s+x.price*x.qty,0),[items]);
  return <CartContext.Provider value={{items, add, remove, subtotal}}>{children}</CartContext.Provider>
}
export const useCart = () => useContext(CartContext);