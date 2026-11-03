"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OwnerSetupPage() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit() {
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch("/api/admin/bootstrap", { method: "POST" });
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
        <p className="auth-description">Esta etapa só funciona para o e-mail do proprietário configurado na Vercel e apenas uma vez.</p>
        <button className="admin-primary" onClick={submit} disabled={busy}>{busy ? "Configurando..." : "Ativar administrador"}</button>
        {message && <p className="auth-message">{message}</p>}
      </section>
    </main>
  );
}
