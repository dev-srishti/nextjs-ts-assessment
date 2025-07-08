import FoodList from "@/components/FoodList";
import { initialFoodItems } from "@/lib/foodItems";

export default function HomePage() {
  return (
    <main className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Food Items</h1>
      <FoodList initialItems={initialFoodItems} />
    </main>
  );
}