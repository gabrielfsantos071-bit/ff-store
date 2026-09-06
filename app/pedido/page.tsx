"use client";
import Header from "../../components/Header";
import { useState } from "react";

export default function Pedido(){
 const [id,setId]=useState(""); const [show,setShow]=useState(false);
 return <><Header/><main className="checkout-page"><div className="section-title"><div><small>ACOMPANHAMENTO</small><h2>Consultar pedido</h2></div></div>
 <div className="lookup"><input value={id} onChange={e=>setId(e.target.value)} placeholder="Ex.: FF123456"/><button className="primary" onClick={()=>setShow(true)}>Consultar</button>
 {show && <div className="status"><b>Pedido {id || "#FF123456"}</b><span>● Em análise</span><p>O status real será conectado ao banco de dados quando o backend for configurado.</p></div>}</div></main></>
}