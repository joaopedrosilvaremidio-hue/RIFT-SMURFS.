import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/server";
import { neon } from "@neondatabase/serverless";

export const runtime = "nodejs";

export async function POST() {
  const { data } = await auth.getSession();
  const email = data?.user?.email?.trim().toLowerCase();
  if (!email) return NextResponse.json({ error: "Faça login primeiro." }, { status: 401 });

  const ownerEmail = process.env.RIFT_ADMIN_EMAIL?.trim().toLowerCase();
  if (!ownerEmail) {
    return NextResponse.json({ error: "O e-mail do proprietário ainda precisa ser configurado na Vercel." }, { status: 503 });
  }
  if (email !== ownerEmail) {
    return NextResponse.json({ error: "Este e-mail não é o proprietário autorizado." }, { status: 403 });
  }

  const sql = neon(process.env.DATABASE_URL!);
  const result = await sql`
    INSERT INTO public.rift_admins (email, invited_by)
    SELECT ${email}, 'initial-owner'
    WHERE NOT EXISTS (SELECT 1 FROM public.rift_admins)
    ON CONFLICT (email) DO NOTHING
    RETURNING email
  `;

  if (result.length === 0) {
    return NextResponse.json({ error: "A configuração inicial já foi concluída." }, { status: 409 });
  }
  return NextResponse.json({ success: true, email });
}
