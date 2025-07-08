'use client';
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

interface FoodItem {
    id: string;
    title: string;
    description: string;
    createdAt: string;
    image: string;
}

interface Props {
    item: FoodItem;
    onDelete: () => void;
}

export default function FoodCard({ item, onDelete }: Props) {
    return (
        <div className="flex justify-between items-start gap-4 border rounded-xl bg-white p-4 shadow">
            <div className="flex gap-4">
                <Image
                    src={item.image ? `/images/${item.image}` : '/images/logo.png'}
                    alt={item.title}
                    width={100}
                    height={100}
                    className="rounded object-cover"
                />
                <div className="pt-1 space-y-1">
                    <h2 className="text-xl font-semibold">{item.title}</h2>
                    <p className="text-sm text-gray-600">{item.description}</p>
                    <p className="text-xs text-gray-400">
                        Created: {format(new Date(item.createdAt), "dd MMM yyyy")}
                    </p>
                </div>
            </div>
            <div className="space-x-2">
                <Link href={`/meals/${item.id}`} className="text-blue-600 no-underline hover:underline">Edit</Link>
                <button onClick={onDelete} className="text-red-600 hover:underline text-sm">Delete</button>
            </div>
        </div>
    );
}