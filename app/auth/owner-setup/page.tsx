"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function OwnerSetupPage() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch("/api/admin/bootstrap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const result = await response.json();
      if (!response.ok) setMessage(result.error || "Não foi possível concluir.");
      else { router.push("/admin"); router.refresh(); }
    } catch {
      setMessage("Falha na conexão.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <a className="logo auth-logo" href="/"><span className="logo-mark">R</span><span>RIFT<span className="purple"> SMURFS</span></span></a>
        <span className="eyebrow">CONFIGURAÇÃO INICIAL</span>
        <h1>Ativar proprietário</h1>
        <p className="auth-description">Entre com o token de configuração inicial para conceder acesso de administrador à sua conta. Essa ativação só funciona uma vez.</p>
        <form onSubmit={submit} className="auth-form">
          <label>Token inicial<input type="password" value={token} onChange={e=>setToken(e.target.value)} required autoComplete="off"/></label>
          <button className="admin-primary" disabled={busy}>{busy ? "Configurando..." : "Ativar administrador"}</button>
        </form>
        {message && <p className="auth-message">{message}</p>}
      </section>
    </main>
  );
}
