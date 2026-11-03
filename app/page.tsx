const categories = ["Contas de jogos", "Jogos digitais"];

export default function Home() {
  return (
    <main>
      <header className="header">
        <a className="logo" href="/" aria-label="RIFT SMURFS início">
          <span className="logo-mark">R</span><span>RIFT<span className="purple"> SMURFS</span></span>
        </a>
        <nav><a href="#categorias">Categorias</a><a href="#catalogo">Produtos</a></nav>
        <div className="header-actions"><button className="btn-ghost" type="button">Entrar</button></div>
      </header>
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span className="dot"/> LOJA GAMER DIGITAL</div>
          <h1>Encontre seu próximo<br/><span className="gradient">jogo ou conta.</span></h1>
          <p>Contas de jogos e jogos digitais.</p>
          <a className="btn-primary hero-btn" href="#catalogo">Ver produtos <span>↗</span></a>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="orbit orbit-one"/><div className="orbit orbit-two"/>
          <div className="rift-core"><div className="rift-symbol">R</div><span>RIFT SMURFS</span></div>
        </div>
      </section>
      <section id="categorias" className="categories section">
        <div className="section-head"><div><span className="eyebrow">CATEGORIAS</span><h2>O que procura?</h2></div></div>
        <div className="category-grid">{categories.map((name,i)=><a className="category" href="#catalogo" key={name}><span className="category-icon">{i===0?"◈":"▣"}</span><span>{name}</span><span className="arrow">↗</span></a>)}</div>
      </section>
      <section id="catalogo" className="catalog section">
        <div className="section-head"><div><span className="eyebrow">LOJA</span><h2>Produtos</h2></div></div>
        <div className="empty-state"><div className="empty-icon">⌕</div><h3>Nenhum produto disponível</h3><p>Os produtos aparecerão aqui quando forem cadastrados.</p></div>
      </section>
      <footer><a className="logo" href="/"><span className="logo-mark">R</span><span>RIFT<span className="purple"> SMURFS</span></span></a><span>© {new Date().getFullYear()} RIFT SMURFS</span></footer>
    </main>
  );
}
