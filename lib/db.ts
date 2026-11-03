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
