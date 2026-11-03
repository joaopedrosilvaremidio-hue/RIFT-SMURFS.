"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [section, setSection] = useState("overview");
  const [adminEmail, setAdminEmail] = useState("");
  const [notice, setNotice] = useState("");
  const [admins, setAdmins] = useState<{email:string; created_at:string}[]>([]);
  const [loadingAdmins, setLoadingAdmins] = useState(false);

  useEffect(() => {
    if (section !== "admins") return;
    setLoadingAdmins(true);
    fetch("/api/admins").then(r => r.json()).then(data => {
      if (Array.isArray(data.admins)) setAdmins(data.admins);
      if (data.error) setNotice(data.error);
    }).catch(() => setNotice("Não foi possível carregar administradores.")).finally(() => setLoadingAdmins(false));
  }, [section]);

  async function inviteAdmin(e: React.FormEvent) {
    e.preventDefault();
    setNotice("");
    const response = await fetch("/api/admins", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: adminEmail }) });
    const data = await response.json();
    if (!response.ok) { setNotice(data.error || "Não foi possível adicionar."); return; }
    setNotice("Administrador autorizado. Ele deverá criar uma conta ou entrar com esse e-mail.");
    setAdminEmail("");
    const refreshed = await fetch("/api/admins").then(r => r.json());
    if (Array.isArray(refreshed.admins)) setAdmins(refreshed.admins);
  }

  const nav = [
    { id: "overview", label: "Visão geral", icon: "▦" },
    { id: "products", label: "Produtos", icon: "◇" },
    { id: "admins", label: "Administradores", icon: "♙" },
    { id: "settings", label: "Configurações", icon: "⚙" },
  ];

  return (
    <main className="admin-shell">
      <aside className="admin-sidebar">
        <a className="logo admin-logo" href="/"><span className="logo-mark">R</span><span>RIFT<span className="purple"> SMURFS</span></span></a>
        <div className="admin-label">ADMINISTRAÇÃO</div>
        <nav className="admin-nav">
          {nav.map(item => <button key={item.id} className={section === item.id ? "active" : ""} onClick={() => {setSection(item.id);setNotice("");}}><span>{item.icon}</span>{item.label}</button>)}
        </nav>
        <a className="admin-back" href="/">← Voltar à loja</a>
      </aside>
      <section className="admin-main">
        <header className="admin-top"><div><span className="admin-label">RIFT SMURFS / PAINEL</span><h1>{nav.find(n=>n.id===section)?.label}</h1></div><span className="admin-status"><i/> Painel administrativo</span></header>

        {section === "overview" && <div className="admin-content">
          <div className="admin-welcome"><div><span className="eyebrow">PAINEL DA LOJA</span><h2>Gerencie sua loja.</h2><p>Use os atalhos abaixo para administrar produtos e acessos.</p></div></div>
          <div className="admin-shortcuts">
            <button onClick={()=>setSection("products")}><span className="shortcut-icon">＋</span><b>Adicionar produto</b><small>Cadastrar conta ou jogo digital</small><span className="shortcut-arrow">→</span></button>
            <button onClick={()=>setSection("admins")}><span className="shortcut-icon">♙</span><b>Administradores</b><small>Gerenciar acesso ao painel</small><span className="shortcut-arrow">→</span></button>
          </div>
          <div className="admin-note"><b>Loja pronta para configuração</b><p>Produtos, pedidos e pagamentos aparecerão aqui após conectar o banco de dados e o checkout.</p></div>
        </div>}

        {section === "products" && <div className="admin-content">
          <div className="admin-panel-card"><div className="admin-card-heading"><div><h2>Produtos</h2><p>Cadastre os produtos que serão exibidos na loja.</p></div><span className="small-tag">Catálogo</span></div>
            <form className="admin-form" onSubmit={e=>{e.preventDefault();setNotice("O cadastro será ativado quando o banco de dados estiver conectado.");}}>
              <label>Nome do produto<input placeholder="Ex.: Conta de jogo / jogo digital" /></label>
              <div className="admin-form-row"><label>Categoria<select defaultValue="account"><option value="account">Conta de jogo</option><option value="game">Jogo digital</option></select></label><label>Preço (R$)<input type="number" min="0" step="0.01" placeholder="0,00"/></label></div>
              <label>Descrição<textarea rows={3} placeholder="Informações essenciais do produto"/></label>
              <label>Entrega<select defaultValue="automatic"><option value="automatic">Automática (após pagamento)</option><option value="manual">Manual</option></select></label>
              <button className="admin-primary" type="submit">Salvar produto</button>
            </form>
            {notice && <p className="admin-notice">{notice}</p>}
          </div>
        </div>}

        {section === "admins" && <div className="admin-content">
          <div className="admin-panel-card"><div className="admin-card-heading"><div><h2>Adicionar administrador</h2><p>Convide outra pessoa para administrar a loja.</p></div><span className="small-tag">Acesso</span></div>
            <form className="admin-form" onSubmit={inviteAdmin}>
              <label>E-mail do administrador<input type="email" value={adminEmail} onChange={e=>setAdminEmail(e.target.value)} required placeholder="email@exemplo.com"/></label>
              <label>Permissão<select defaultValue="admin"><option value="admin">Administrador</option></select></label>
              <button className="admin-primary" type="submit">Adicionar administrador</button>
            </form>
            {notice && <p className="admin-notice">{notice}</p>}
            <div className="admin-warning">O e-mail autorizado poderá entrar no painel após criar conta ou fazer login. Apenas administradores atuais podem adicionar novos acessos.</div>
            <div className="admin-list"><h3>Administradores autorizados</h3>{loadingAdmins ? <p>Carregando...</p> : admins.length ? admins.map(a=><div className="admin-list-row" key={a.email}><span>{a.email}</span><small>Administrador</small></div>) : <p>Nenhum administrador listado.</p>}</div>
          </div>
        </div>}

        {section === "settings" && <div className="admin-content"><div className="admin-panel-card"><h2>Configurações</h2><p className="admin-muted">Configurações da loja serão disponibilizadas após conectar os serviços necessários.</p></div></div>}
      </section>
    </main>
  );
}
