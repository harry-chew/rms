import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function OpportunitiesPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/auth/login");
  }

  return (
    <div className="flex-1 w-full flex flex-col">
      <h1>OPPORTUNITIES</h1>
    </div>
  );
}
