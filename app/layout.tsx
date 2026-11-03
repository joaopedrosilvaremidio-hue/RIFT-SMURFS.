import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RIFT SMURFS | Marketplace Gamer",
  description: "Loja digital gamer. Produtos reais cadastrados pela RIFT SMURFS.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
