import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import { Product } from "../components/CartContext";

const products: Product[] = [
 { id: 1, name: "120 Diamantes", diamonds: "120", price: 4.99 },
{ id: 2, name: "360 Diamantes", diamonds: "360", price: 14.99 },
  { id: 3, name: "570 Diamantes", diamonds: "570", price: 24.99 },
  { id: 4, name: "1.100 Diamantes", diamonds: "1.100", price: 49.99 ,badge:"MELHOR VALOR"},
{ id: 5, name: "2.340 Diamantes", diamonds: "2.340", price: 99.99 },
  {id:6,name:"6.200 Diamantes",diamonds:"6.200",price:249.99,badge:"ECONOMIZE"}
];

export default function Home(){
 return <><Header/>
 <main>
   <section className="hero">
     <div className="hero-copy">
       <div className="eyebrow">LOJA GAMER DIGITAL</div>
       <h1>Seu próximo <em>upgrade</em><br/>começa aqui.</h1>
       <p>Produtos digitais para sua experiência gamer, com compra simples e entrega rápida.</p>
       <a className="primary" href="#produtos">Ver produtos</a>
       <div className="trust"><span>✓ Pagamento seguro</span><span>✓ Atendimento</span><span>✓ Entrega digital</span></div>
     </div>
     <div className="hero-art"><div className="orb">◆</div><div className="float-card">FF STORE<br/><b>DIAMANTES</b></div></div>
   </section>

   <section className="section" id="produtos">
     <div className="section-title"><div><small>CATÁLOGO</small><h2>Escolha seu pacote</h2></div><p>Selecione o produto e informe os dados necessários no checkout.</p></div>
     <div className="grid">{products.map(p=><ProductCard key={p.id} product={p}/>)}</div>
   </section>

   <section className="how section" id="como-funciona">
     <div className="section-title"><div><small>PASSO A PASSO</small><h2>Como funciona</h2></div></div>
     <div className="steps">
       <div><b>01</b><h3>Escolha</h3><p>Selecione o pacote que deseja comprar.</p></div>
       <div><b>02</b><h3>Informe</h3><p>Preencha os dados necessários para a entrega.</p></div>
       <div><b>03</b><h3>Pague</h3><p>Finalize pelo método de pagamento disponível.</p></div>
       <div><b>04</b><h3>Receba</h3><p>Acompanhe o pedido e receba conforme o método autorizado.</p></div>
     </div>
   </section>

   <section className="notice"><strong>⚡ Entrega digital</strong><span>Operação preparada para integração com um gateway de pagamento e sistema de entrega.</span></section>
 </main>
 <footer>© 2026 FF STORE · Loja independente. Não afiliada à Garena.</footer>
 </>;
}