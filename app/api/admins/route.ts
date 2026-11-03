import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/server";
import { addStoreAdmin, isStoreAdmin, listStoreAdmins } from "@/lib/db";

export const runtime = "nodejs";

async function currentAdmin() {
  const { data } = await auth.getSession();
  const email = data?.user?.email?.toLowerCase();
  if (!email || !(await isStoreAdmin(email))) return null;
  return email;
}

export async function GET() {
  const email = await currentAdmin();
  if (!email) return NextResponse.json({ error: "Acesso negado." }, { status: 401 });
  const admins = await listStoreAdmins();
  return NextResponse.json({ admins });
}

export async function POST(request: Request) {
  const invitedBy = await currentAdmin();
  if (!invitedBy) return NextResponse.json({ error: "Acesso negado." }, { status: 401 });

  const body = await request.json().catch(() => null);
  const email = String(body?.email ?? "").trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Informe um e-mail válido." }, { status: 400 });
  }

  await addStoreAdmin(email, invitedBy);
  return NextResponse.json({ success: true, email });
}
