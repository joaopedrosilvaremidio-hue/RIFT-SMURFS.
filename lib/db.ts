import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export async function isStoreAdmin(email: string) {
  const normalized = email.trim().toLowerCase();
  if (!normalized) return false;
  const rows = await sql`SELECT 1 FROM public.rift_admins WHERE email = ${normalized} LIMIT 1`;
  return rows.length > 0;
}

export async function listStoreAdmins() {
  return await sql`SELECT email, created_at FROM public.rift_admins ORDER BY created_at ASC`;
}

export async function addStoreAdmin(email: string, invitedBy: string) {
  const normalized = email.trim().toLowerCase();
  await sql`
    INSERT INTO public.rift_admins (email, invited_by)
    VALUES (${normalized}, ${invitedBy.trim().toLowerCase()})
    ON CONFLICT (email) DO NOTHING
  `;
}

export async function listStoreProducts() {
  return await sql`SELECT id, title, category, description, price, delivery_mode, image_data, active, created_at FROM public.rift_products ORDER BY created_at DESC`;
}

export async function createStoreProduct(input: {
  title: string; category: "account" | "game"; description: string; price: number; delivery_mode: "automatic" | "manual"; image_data: string;
}) {
  const [product] = await sql`
    INSERT INTO public.rift_products (title, category, description, price, delivery_mode, active)
    VALUES (${input.title}, ${input.category}, ${input.description}, ${input.price}, ${input.delivery_mode}, false)
    RETURNING id, title, category, price, active
  `;
  return product;
}
