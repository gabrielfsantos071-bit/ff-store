"use client";
import { Check, ShoppingCart } from "lucide-react";
import { Product, useCart } from "./CartContext";

export default function ProductCard({product}:{product:Product}) {
  const {add} = useCart();
  return <article className="product-card">
    {product.badge && <div className="badge">{product.badge}</div>}
    <div className="diamond"><span>◆</span></div>
    <div className="product-info">
      <small>PACOTE</small><h3>{product.name}</h3>
      <div className="product-benefit"><Check size={15}/> Entrega digital</div>
      <div className="price">R$ {product.price.toFixed(2).replace(".",",")}</div>
      <button onClick={()=>add(product)}><ShoppingCart size={17}/> Adicionar</button>
    </div>
  </article>
}