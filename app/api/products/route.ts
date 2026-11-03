import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/server";
import { createStoreProduct, isStoreAdmin, listStoreProducts } from "@/lib/db";

export const runtime = "nodejs";

async function authorized() {
  const { data } = await auth.getSession();
  const email = data?.user?.email?.toLowerCase();
  return !!email && await isStoreAdmin(email);
}

export async function GET() {
  if (!(await authorized())) return NextResponse.json({ error: "Acesso negado." }, { status: 401 });
  return NextResponse.json({ products: await listStoreProducts() });
}

export async function POST(request: Request) {
  if (!(await authorized())) return NextResponse.json({ error: "Acesso negado." }, { status: 401 });
  const body = await request.json().catch(() => null);
  const title = String(body?.title ?? "").trim();
  const category = body?.category;
  const description = String(body?.description ?? "").trim();
  const price = Number(body?.price);
  const delivery_mode = body?.delivery_mode;
  const image_data = String(body?.image_data ?? "");
  if (image_data && (!image_data.startsWith("data:image/") || image_data.length > 3_000_000)) {
    return NextResponse.json({ error: "Imagem inválida ou muito grande. Use uma imagem de até 2 MB." }, { status: 400 });
  }

  if (!title || title.length > 160 || !["account", "game"].includes(category) ||
      !Number.isFinite(price) || price < 0 || !["automatic", "manual"].includes(delivery_mode)) {
    return NextResponse.json({ error: "Confira nome, categoria, preço e entrega." }, { status: 400 });
  }

  const product = await createStoreProduct({ title, category, description, price, delivery_mode, image_data });
  return NextResponse.json({ success: true, product });
}
