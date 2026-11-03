"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth/client";

export default function SignInPage() {
  const router = useRouter();
  const params = useSearchParams();
  const [register, setRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMessage("");
    try {
      const result = register
        ? await authClient.signUp.email({ email, password, name: name || email.split("@")[0] })
        : await authClient.signIn.email({ email, password });
      if (result.error) {
        setMessage(result.error.message || "Não foi possível autenticar.");
      } else {
        router.push(register ? "/auth/owner-setup" : (params.get("next") || "/admin"));
        router.refresh();
      }
    } catch {
      setMessage("Não foi possível conectar. Tente novamente.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <a className="logo auth-logo" href="/"><span className="logo-mark">R</span><span>RIFT<span className="purple"> SMURFS</span></span></a>
        <span className="eyebrow">ACESSO RESTRITO</span>
        <h1>{register ? "Criar conta" : "Entrar no painel"}</h1>
        <p className="auth-description">{register ? "Crie a conta do responsável pela loja." : "Entre com seu e-mail e senha."}</p>
        <form onSubmit={submit} className="auth-form">
          {register && <label>Nome<input value={name} onChange={e=>setName(e.target.value)} placeholder="Seu nome" /></label>}
          <label>E-mail<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required autoComplete="email" placeholder="seu@email.com"/></label>
          <label>Senha<input type="password" value={password} onChange={e=>setPassword(e.target.value)} required minLength={8} autoComplete={register ? "new-password" : "current-password"} placeholder="Mínimo 8 caracteres"/></label>
          <button className="admin-primary" disabled={busy}>{busy ? "Aguarde..." : register ? "Criar conta" : "Entrar"}</button>
        </form>
        {message && <p className="auth-message">{message}</p>}
        {params.get("access")==="denied" && <p className="auth-message">Conta sem permissão de administrador.</p>}
        <button className="auth-toggle" onClick={()=>{setRegister(!register);setMessage("");}}>{register ? "Já tenho conta — entrar" : "Primeiro acesso? Criar conta"}</button>
        <a className="auth-home" href="/">Voltar à loja</a>
      </section>
    </main>
  );
}
