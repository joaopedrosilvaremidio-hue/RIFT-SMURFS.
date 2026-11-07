"use client";
import { useMemo, useState } from "react";

type Product = { id:string; title:string; category:string; description?:string; price:string|number; image_data?:string|null };
export default function Storefront({ products=[] }: { products:Product[] }) {
  const [query,setQuery]=useState("");
  const [sort,setSort]=useState("recentes");
  const accounts=useMemo(()=>products.filter(p=>p.category==="account"&&(`${p.title} ${p.description||""}`).toLowerCase().includes(query.toLowerCase())).sort((a,b)=>sort==="menor"?Number(a.price)-Number(b.price):sort==="maior"?Number(b.price)-Number(a.price):0),[products,query,sort]);
  const money=(p:Product)=>Number(p.price).toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
  return <main className="marketplace rift-accounts">
    <div className="market-topline"><span>RIFT SMURFS <b>• CONTAS DE JOGOS</b></span><span>CONTAS DISPONÍVEIS • PAGAMENTO VIA PIX</span></div>
    <header className="market-header"><a className="logo" href="/"><span className="logo-mark">R</span><span>RIFT<span className="purple"> SMURFS</span></span></a>
      <div className="market-search"><span>⌕</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar uma conta..."/></div>
      
    </header>
    <nav className="game-nav"><a className="selected" href="#contas">Contas disponíveis</a><a href="#contas">League of Legends</a><a href="#contas">Valorant</a><a href="#contas">Outros jogos</a></nav>
    <section className="market-hero"><div className="market-hero-copy"><div className="market-kicker"><i/> RIFT SMURFS · CONTAS DE JOGOS</div><h1>Encontre a conta<br/><span>que procura.</span></h1><p>Confira as contas disponíveis, veja os detalhes e escolha a que combina com você.</p><a className="market-hero-cta" href="#contas">Explorar contas <b>→</b></a><div className="market-stats"><span><b>CATÁLOGO</b><small>Contas de jogos disponíveis</small></span><span><b>PAGAMENTO</b><small>Via Pix</small></span><span><b>DÚVIDAS</b><small>Fale com a loja</small></span></div></div><div className="market-hero-visual"><div className="market-ring ring-a"/><div className="market-ring ring-b"/><div className="market-logo-3d">R<span>IFT</span><small>SMURFS</small></div><div className="market-float f1">✦ CONTAS DE JOGOS</div><div className="market-float f2">ESCOLHA SUA CONTA</div></div></section>
    <section className="market-section" id="contas"><div className="market-section-heading"><div><div className="market-kicker">NOSSO CATÁLOGO</div><h2>Contas disponíveis</h2><p>Veja as contas disponíveis na loja.</p></div><div className="market-sort"><label>Ordenar</label><select value={sort} onChange={e=>setSort(e.target.value)}><option value="recentes">Mais recentes</option><option value="menor">Menor preço</option><option value="maior">Maior preço</option></select></div></div>
      <div className="market-result-count">{accounts.length} {accounts.length===1?"conta disponível":"contas disponíveis"}</div>
      {accounts.length?<div className="market-product-grid">{accounts.map(p=><article className="market-product" key={p.id}><a href={`/checkout?product=${encodeURIComponent(p.id)}`} className="market-product-img">{p.image_data?<img src={p.image_data} alt={p.title}/>:<div className="market-img-placeholder"><span>R</span><small>RIFT SMURFS</small></div>}<span className="market-type">CONTA DE JOGO</span></a><div className="market-product-content"><div className="market-product-meta"><span>Conta de jogo</span><span className="stock-dot">● À venda</span></div><a href={`/checkout?product=${encodeURIComponent(p.id)}`}><h3>{p.title}</h3></a>{p.description&&<p>{p.description}</p>}<div className="market-product-footer"><strong>{money(p)}</strong><a href={`/checkout?product=${encodeURIComponent(p.id)}`}>Ver detalhes <span>↗</span></a></div></div></article>)}</div>:<div className="market-empty"><span>⌕</span><h3>Nenhuma conta disponível</h3><p>{query?"Tente buscar por outro nome.":"Estamos preparando novas contas. Volte em breve."}</p>{query&&<button onClick={()=>setQuery("")}>Limpar busca</button>}</div>}
    </section>
    <section className="market-trust"><div><span className="market-kicker">RIFT SMURFS</span><h2>Escolha sua próxima<br/><span>conta de jogo.</span></h2></div><p>Leia as informações da conta antes de comprar. Se tiver alguma dúvida, entre em contato com a loja.</p><a href="#contas">Voltar ao catálogo ↑</a></section>
    <footer className="market-footer"><a className="logo" href="/"><span className="logo-mark">R</span><span>RIFT<span className="purple"> SMURFS</span></span></a><span>© {new Date().getFullYear()} RIFT SMURFS</span><a href="#contas">Ver contas</a></footer>
  </main>;
}