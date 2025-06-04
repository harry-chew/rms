'use client';

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

type InventoryItem = {
    id: number;
    name: string;
    quarantine: boolean;
}

export default function QuarantinedItemList() {
    const supabase = createClient();
    const [quarantineItems, setQuarantineItems] = useState<InventoryItem[]>([]);

    const fetchQuarantineItems = async () => {
        const { data: quarantineItems, error } = await supabase
            .from('inventory-item')
            .select('*')
            .eq('quarantine', true);

        if (error) {
            console.error("Error fetching quarantine items:", error.message);
        }
        else {
            console.log("Fetched quarantine items:", quarantineItems);
            setQuarantineItems(quarantineItems || []);
        }
    }

    useEffect(() => {
        fetchQuarantineItems();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleQuarantineAction = async (itemId: number) => {
        const { error: updateError } = await supabase
            .from('inventory-item')
            .update({ quarantine: false })
            .eq('id', itemId);

        if (updateError) {
            console.error("Error updating quarantine status:", updateError.message);
        }
        else {
            console.log(`Item ${itemId} removed from quarantine`);
            //fetchQuarantineItems(); // Refresh the list after updating
            setQuarantineItems(prevItems => prevItems.filter(item => item.id !== itemId));
        }
    };

    return (
        <div className="flex flex-col gap-4">
          {quarantineItems?.map((item : InventoryItem) => (
          <div key={item.id} className="p-4 border rounded">
            <Button onClick={() => handleQuarantineAction(item.id)}>R</Button>
            <h2 className="text-lg font-semibold">{item.name}</h2>
          </div>
        ))}
        </div>
    );
}