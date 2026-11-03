const categories = ["Contas de jogos", "Jogos digitais", "Itens e skins", "Gift cards"];

export default function Home() {
  return (
    <main>
      <div className="topbar"><span>RIFT SMURFS</span><span>Marketplace gamer digital</span></div>
      <header className="header">
        <a className="logo" href="/" aria-label="RIFT SMURFS início"><span className="logo-mark">R</span><span>RIFT<span className="purple"> SMURFS</span></span></a>
        <nav><a href="#categorias">Categorias</a><a href="#catalogo">Explorar produtos</a></nav>
        <div className="header-actions"><button className="btn-ghost" type="button">Entrar</button><button className="btn-primary" type="button">Minha conta</button></div>
      </header>
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span className="dot"/> SUA LOJA GAMER DIGITAL</div>
          <h1>Seu próximo<br/><span className="gradient">nível começa aqui.</span></h1>
          <p>Encontre contas, jogos digitais e itens gamer. Produtos disponíveis serão publicados aqui pela equipe RIFT SMURFS.</p>
          <a className="btn-primary hero-btn" href="#catalogo">Explorar catálogo <span>↗</span></a>
          <div className="hero-foot"><span>◈ Produtos digitais</span><span>◈ Compra segura em implantação</span></div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="orbit orbit-one"/><div className="orbit orbit-two"/>
          <div className="rift-core"><div className="rift-symbol">R</div><span>ENTER THE RIFT</span></div>
          <div className="float-tag tag-top">RIFT <b>SMURFS</b></div><div className="float-tag tag-bottom"><span className="purple-dot"/> GAMING MARKET</div>
        </div>
      </section>
      <section id="categorias" className="categories section">
        <div className="section-head"><div><span className="eyebrow">NAVEGUE POR</span><h2>Categorias</h2></div><span className="muted">Selecione uma categoria</span></div>
        <div className="category-grid">{categories.map((name,i)=><a className="category" href="#catalogo" key={name}><span className="category-icon">{["◈","▣","✧","◇"][i]}</span><span>{name}</span><span className="arrow">↗</span></a>)}</div>
      </section>
      <section id="catalogo" className="catalog section">
        <div className="section-head"><div><span className="eyebrow">CATÁLOGO</span><h2>Produtos em destaque</h2></div><span className="muted">Produtos reais, sem anúncios fictícios</span></div>
        <div className="empty-state"><div className="empty-icon">⌕</div><h3>Estamos preparando o catálogo</h3><p>Nenhum produto foi cadastrado ainda. Assim que houver produtos reais disponíveis, eles aparecerão aqui.</p><span className="empty-label">CATÁLOGO VAZIO · SEM ESTOQUE PUBLICADO</span></div>
      </section>
      <section className="trust section"><div><span className="eyebrow">RIFT SMURFS</span><h2>Uma experiência gamer<br/>simples e direta.</h2></div><p>Estamos construindo a loja. Informações de pagamento, entrega e suporte serão exibidas quando os recursos estiverem configurados.</p></section>
      <footer><a className="logo" href="/"><span className="logo-mark">R</span><span>RIFT<span className="purple"> SMURFS</span></span></a><span>© {new Date().getFullYear()} RIFT SMURFS. Todos os direitos reservados.</span><span>Loja em construção</span></footer>
    </main>
  );
}
