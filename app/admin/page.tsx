import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/server";
import { isStoreAdmin } from "@/lib/db";
import AdminPanel from "./admin-panel";

export const runtime = "nodejs";

export default async function AdminPage() {
  const { data } = await auth.getSession();
  const email = data?.user?.email?.toLowerCase();
  if (!email || !(await isStoreAdmin(email))) {
    redirect("/auth/sign-in?access=denied");
  }
  return <AdminPanel />;
}