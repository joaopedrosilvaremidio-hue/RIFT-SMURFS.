import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/server";
import { isStoreAdmin } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data } = await auth.getSession();
  const email = data?.user?.email?.toLowerCase();

  if (!email) redirect("/auth/sign-in?next=/admin");
  if (!(await isStoreAdmin(email))) redirect("/auth/sign-in?access=denied");

  return <>{children}</>;
}
