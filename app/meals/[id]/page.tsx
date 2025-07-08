'use client';

import { useEffect, useState } from 'react';
import FoodForm from '@/components/FoodForm';
import { saveFood } from '@/actions/food-actions';
import type { FoodItem } from '@/constants';
import { useActionState } from 'react';
import { useParams, useRouter } from 'next/navigation';


export default function MealDetailingPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const isNew = id === "new";
  const [item, setItem] = useState<FoodItem | null>(null);
  const [loading, setLoading] = useState(!isNew);

  const [formState, formAction] = useActionState(saveFood, {
    success: false,
    errors: {},
    values: {
      title: '',
      description: ''
    }
  });

  useEffect(() => {
    if (!isNew && id) {
      const storedItems = localStorage.getItem("foodItems");
      const parsedItems: FoodItem[] = storedItems ? JSON.parse(storedItems) : [];

      const match = parsedItems.find((i: FoodItem) => i.id === id);
      setItem(match || null);
      setLoading(false);
    }
  }, [id, isNew]);

  if (!isNew && loading) return <p className="p-6">Loading...</p>;
  if (!isNew && !item) return <p className="p-6">Item not found</p>;

  const initialValues = formState.success
    ? formState.data.values
    : item
      ? { title: item.title, description: item.description }
      : formState.values;

  const handleSuccess = (item: FoodItem) => {
    const stored = localStorage.getItem("foodItems");
    const parsed = stored ? JSON.parse(stored) : [];

    const updated = parsed.some((i: FoodItem) => i.id === item.id)
      ? parsed.map((i: FoodItem) => (i.id === item.id ? {...item, image: i.image} : i))
      : [...parsed, item];

    localStorage.setItem("foodItems", JSON.stringify(updated));
    router.push("/");
  };

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-neutral-950">
        {isNew ? 'Add New Food Item' : `Edit: ${item?.title}`}
      </h1>
      <FoodForm
        action={formAction}
        state={formState}
        initialValues={initialValues}
        onSuccess={handleSuccess}
      />
    </main>
  );
}
