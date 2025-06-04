import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AddInventoryForm from "@/components/AddInventoryForm";

export default async function InventoryPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/auth/login");
  }

  const { data: inventoryItems, error: inventoryError } = await supabase.from('inventory-item').select('*');
  if (inventoryError) {
    console.error("Error fetching inventory items:", inventoryError.message);
  } else {
    console.log("Fetched inventory items:", inventoryItems);
  }

  return (
    <div className="flex-1 w-full flex flex-col">
      <h1>INVENTORY</h1>
      <AddInventoryForm/>
      <div className="flex flex-col gap-4">
        {inventoryItems?.map((item) => (
          <div key={item.id} className="p-4 border rounded">
            <h2 className="text-lg font-semibold">{item.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
