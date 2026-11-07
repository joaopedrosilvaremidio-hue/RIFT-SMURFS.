"use client";
import { useMemo, useState } from "react";

type Product = { id:string; title:string; category:string; description?:string; price:string|number; image_data?:string|null };
export default function Storefront({ products=[] }: { products:Product[] }) {
  const [query,setQuery]=useState("");
  const [sort,setSort]=useState("recentes");
  const accounts=useMemo(()=>products.filter(p=>p.category==="account"&&(`${p.title} ${p.description||""}`).toLowerCase().includes(query.toLowerCase())).sort((a,b)=>sort==="menor"?Number(a.price)-Number(b.price):sort==="maior"?Number(b.price)-Number(a.price):0),[products,query,sort]);
  const money=(p:Product)=>Number(p.price).toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
  return <main className="marketplace rift-accounts">
    <div className="market-topline"><span>RIFT SMURFS <b>• CONTAS GAMER</b></span><span>CONTAS SELECIONADAS • PIX</span></div>
    <header className="market-header"><a className="logo" href="/"><span className="logo-mark">R</span><span>RIFT<span className="purple"> SMURFS</span></span></a>
      <div className="market-search"><span>⌕</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar conta ou jogo..."/></div>
      <a className="market-sell" href="/auth/sign-in">Painel administrativo ↗</a>
    </header>
    <nav className="game-nav"><a className="selected" href="#contas">Contas disponíveis</a><a href="#contas">League of Legends</a><a href="#contas">Valorant</a><a href="#contas">Outros jogos</a></nav>
    <section className="market-hero"><div className="market-hero-copy"><div className="market-kicker"><i/> RIFT SMURFS · GAME ACCOUNTS</div><h1>Sua próxima conta.<br/><span>Seu próximo nível.</span></h1><p>Contas de jogos selecionadas. Escolha a sua e consulte os detalhes da oferta.</p><a className="market-hero-cta" href="#contas">Ver contas disponíveis <b>→</b></a><div className="market-stats"><span><b>CONTAS</b><small>Somente contas de jogos</small></span><span><b>PIX</b><small>Pagamento direto</small></span><span><b>SUPORTE</b><small>Atendimento da loja</small></span></div></div><div className="market-hero-visual"><div className="market-ring ring-a"/><div className="market-ring ring-b"/><div className="market-logo-3d">R<span>IFT</span><small>SMURFS</small></div><div className="market-float f1">✦ GAMING ACCOUNTS</div><div className="market-float f2">LEVEL UP YOUR GAME</div></div></section>
    <section className="market-section" id="contas"><div className="market-section-heading"><div><div className="market-kicker">CATÁLOGO RIFT</div><h2>Contas disponíveis</h2><p>Encontre sua próxima conta gamer.</p></div><div className="market-sort"><label>Ordenar</label><select value={sort} onChange={e=>setSort(e.target.value)}><option value="recentes">Mais recentes</option><option value="menor">Menor preço</option><option value="maior">Maior preço</option></select></div></div>
      <div className="market-result-count">{accounts.length} {accounts.length===1?"conta disponível":"contas disponíveis"}</div>
      {accounts.length?<div className="market-product-grid">{accounts.map(p=><article className="market-product" key={p.id}><a href={`/checkout?product=${encodeURIComponent(p.id)}`} className="market-product-img">{p.image_data?<img src={p.image_data} alt={p.title}/>:<div className="market-img-placeholder"><span>R</span><small>RIFT SMURFS</small></div>}<span className="market-type">CONTA DE JOGO</span></a><div className="market-product-content"><div className="market-product-meta"><span>Conta gamer</span><span className="stock-dot">● Disponível</span></div><a href={`/checkout?product=${encodeURIComponent(p.id)}`}><h3>{p.title}</h3></a>{p.description&&<p>{p.description}</p>}<div className="market-product-footer"><strong>{money(p)}</strong><a href={`/checkout?product=${encodeURIComponent(p.id)}`}>Ver conta <span>↗</span></a></div></div></article>)}</div>:<div className="market-empty"><span>⌕</span><h3>Nenhuma conta disponível</h3><p>{query?"Tente buscar por outro nome.":"Novas contas serão adicionadas em breve."}</p>{query&&<button onClick={()=>setQuery("")}>Limpar busca</button>}</div>}
    </section>
    <section className="market-trust"><div><span className="market-kicker">RIFT SMURFS</span><h2>Encontre sua próxima<br/><span>conta gamer.</span></h2></div><p>Confira os detalhes da conta antes de realizar sua compra. Em caso de dúvidas, entre em contato com o suporte.</p><a href="#contas">Voltar ao catálogo ↑</a></section>
    <footer className="market-footer"><a className="logo" href="/"><span className="logo-mark">R</span><span>RIFT<span className="purple"> SMURFS</span></span></a><span>© {new Date().getFullYear()} RIFT SMURFS</span><a href="#contas">Ver contas</a></footer>
  </main>;
}