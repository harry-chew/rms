'use client';

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { createClient } from '@/lib/supabase/client';
import { redirect } from 'next/navigation';

export default function AddInventoryForm() {
    const supabase = createClient();
    const [inventoryItemName, setInventoryItemName] = useState("");

    const handleAddInventoryItem = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!inventoryItemName) {
            alert("Inventory item name is required");
            return;
        }

        console.log("Adding inventory item:", inventoryItemName);

        const inventoryItem = {
            name: inventoryItemName,
        };

        const response = await supabase.from('inventory-item').insert(inventoryItem);
        if (response.error) {
        console.error("Error saving blog:", response.error.message);
        }

        setInventoryItemName(""); // Clear the input field after submission0
        redirect("/dashboard/inventory");
    }

    return (
        <form className="my-4 flex flex-col gap-2" onSubmit={handleAddInventoryItem}>
            <Label htmlFor="inventory-item-name">Inventory Item Name:</Label>
            <Input name="inventory-item-name" type="text" value={inventoryItemName} onChange={(e) => setInventoryItemName(e.target.value)}></Input>
            <Button>Add</Button>
        </form>
    );
}
