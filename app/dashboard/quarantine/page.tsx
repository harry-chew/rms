import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import QurantineItemList from "@/components/QuarantinedItemList";

export default async function QuarantinePage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/auth/login");
  }

  return (
    <div className="flex-1 w-full flex flex-col">
      <h1>QUARANTINE</h1>
      <QurantineItemList />
    </div>
  );
}