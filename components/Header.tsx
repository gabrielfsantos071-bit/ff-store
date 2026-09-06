"use client";
import Link from "next/link";
import { ShoppingBag, ShieldCheck, Zap } from "lucide-react";
import { useCart } from "./CartContext";

export default function Header() {
  const {items} = useCart();
  return <header className="header">
    <Link href="/" className="brand"><span>FF</span> STORE</Link>
    <nav>
      <Link href="/#produtos">Produtos</Link>
      <Link href="/#como-funciona">Como funciona</Link>
      <Link href="/pedido">Consultar pedido</Link>
    </nav>
    <Link href="/carrinho" className="cart"><ShoppingBag size={19}/><b>{items.length}</b></Link>
  </header>
}