'use client';
import { useActionState, useEffect, useState } from "react";
import { List, AutoSizer } from "react-virtualized";
import FoodCard from "./FoodCard";
import Link from "next/link";
import ConfirmModal from "./ConfirmModal";


interface FoodItem {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  image: string;
}

interface Props {
  initialItems: FoodItem[];
}

export default function FoodList({ initialItems }: Props) {
  const [items, setItems] = useState<FoodItem[]>(initialItems);
  const [showModal, setShowModal] = useState(false);
  const [toDeleteId, setToDeleteId] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("foodItems");

    if (stored) {
      try {
        setItems(JSON.parse(stored));
      } catch {
        console.error("Failed to parse stored food items.");
        localStorage.removeItem("foodItems"); // Optionally clear corrupted data
      }
    } else {
      // No localStorage yet → save server items into it
      localStorage.setItem("foodItems", JSON.stringify(initialItems));
      setItems(initialItems);
    }
  }, []);

  const handleDelete = (id: string) => {
    setToDeleteId(id);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    if (toDeleteId) {
      const filtered = items.filter((i) => i.id !== toDeleteId);
      saveToStorage(filtered);
      setToDeleteId(null);
      setShowModal(false);
    }
  };

  const saveToStorage = (updated: FoodItem[]) => {
    localStorage.setItem("foodItems", JSON.stringify(updated));
    setItems(updated);
  };

  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const item = items[index];

    return (
      <div key={item.id} style={style} className="p-2 space-y-2">
        <FoodCard
          item={item}
          onDelete={() => handleDelete(item.id)}
        />
      </div>
    );
  };


  return (
    <div>
      <div className="flex justify-end mb-4">
        <Link
          href="/meals/new"
          className="bg-green-600 text-white px-4 py-1 rounded inline-block"
        >
          + Add Food
        </Link>
      </div>

      <div style={{ height: "600px" }}>
        <AutoSizer>
          {({ height, width }) => (
            <List
              width={width}
              height={height}
              rowHeight={170}
              rowCount={items.length}
              rowRenderer={Row}
            />
          )}
        </AutoSizer>
      </div>

      {showModal && <ConfirmModal
        onCancel={() => setShowModal(false)}
        onConfirm={handleConfirmDelete}
        message={`Are you sure you want to delete ${items.find(i => i.id === toDeleteId!)?.title} food item`}
      />}
    </div>
  );
}
