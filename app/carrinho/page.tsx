"use client";
import Header from "../../components/Header";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { useCart } from "../../components/CartContext";

export default function Carrinho(){
 const {items,remove,subtotal}=useCart();
 return <><Header/><main className="checkout-page"><div className="section-title"><div><small>SEU PEDIDO</small><h2>Carrinho</h2></div></div>
 {items.length===0 ? <div className="empty"><h3>Seu carrinho está vazio.</h3><p>Escolha um pacote para começar.</p><Link className="primary" href="/#produtos">Ver produtos</Link></div> :
 <div className="cart-layout"><div className="cart-list">{items.map((x:any)=><div className="cart-row" key={x.id}><div className="mini-diamond">◆</div><div><b>{x.name}</b><small>Quantidade: {x.qty}</small></div><strong>R$ {(x.price*x.qty).toFixed(2).replace(".",",")}</strong><button onClick={()=>remove(x.id)}><Trash2 size={18}/></button></div>)}</div>
 <aside className="summary"><h3>Resumo</h3><div><span>Subtotal</span><b>R$ {subtotal.toFixed(2).replace(".",",")}</b></div><hr/><div className="total"><span>Total</span><b>R$ {subtotal.toFixed(2).replace(".",",")}</b></div><Link className="primary full" href="/checkout">Continuar</Link></aside></div>}
 </main></>
}