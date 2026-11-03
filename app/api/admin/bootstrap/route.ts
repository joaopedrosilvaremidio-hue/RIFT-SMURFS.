import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/server";
import { neon } from "@neondatabase/serverless";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const { data } = await auth.getSession();
  const email = data?.user?.email?.trim().toLowerCase();
  if (!email) return NextResponse.json({ error: "Faça login primeiro." }, { status: 401 });

  const expected = process.env.RIFT_ADMIN_BOOTSTRAP_TOKEN;
  const body = await request.json().catch(() => null);
  const token = String(body?.token ?? "");
  if (!expected || token.length < 20 || token !== expected) {
    return NextResponse.json({ error: "Token inicial inválido." }, { status: 403 });
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
