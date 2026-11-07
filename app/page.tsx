import Storefront from "./storefront";
import { listStoreProducts } from "@/lib/db";

export default async function Home() {
  let products: any[] = [];
  try { products = (await listStoreProducts()).filter((product: any) => product.active && product.category === "account"); } catch { products = []; }
  return <Storefront products={products} />;
}