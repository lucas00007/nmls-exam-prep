import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";
import DashboardContent from "./DashboardContent";

export default async function DashboardPage() {
  const cookieStore = cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) redirect("/login");

  const payload = verifyToken(token);
  if (!payload) redirect("/login");

  return <DashboardContent email={payload.email} />;
}
