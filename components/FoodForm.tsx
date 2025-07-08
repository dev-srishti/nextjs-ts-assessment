'use client';

import { FoodFormState, FoodItem } from "@/constants";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";


interface FoodFormProps {
    action: (formData: FormData) => void;
    state: FoodFormState;
    initialValues: {
        title: string;
        description: string;
    };
    onSuccess?: (item: FoodItem) => void
}

export default function FoodForm({ action: formAction, state: formState, initialValues, onSuccess }: FoodFormProps) {
    const router = useRouter();
    const id = useParams()?.id as string;

    useEffect(() => {
        if (formState.success && formState.data && onSuccess) {
            const item = {
                ...formState.data,
                title: formState.data.values.title,
                description: formState.data.values.description,
            };
            onSuccess(item);
        }
    }, [formState]);

    return (
        <form action={formAction} className="bg-gray-100 p-4 rounded space-y-2">
            {id && (
                <input type="hidden" name="id" value={id} />
            )}
            <div>
                <label className="block text-sm font-medium">Title</label>
                <input
                    name="title"
                    className="w-full p-2 border rounded"
                    defaultValue={initialValues.title}
                    required
                />
                {formState.errors?.title && (
                    <p className="text-sm text-red-500">{formState.errors.title.join(", ")}</p>
                )}
            </div>
            <div>
                <label className="block text-sm font-medium">Description</label>
                <input
                    name="description"
                    className="w-full p-2 border rounded"
                    defaultValue={initialValues.description}
                    required
                />
                {formState.errors?.description && (
                    <p className="text-sm text-red-500">{formState.errors.description.join(", ")}</p>
                )}
            </div>
            <div className="flex gap-2">
                <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">
                    Save
                </button>
                <button type="submit" onClick={() => router.push('/')}className="bg-slate-500 text-black px-4 py-1 rounded">
                    Cancel
                </button>
            </div>

            {formState.success && <p className="text-green-600">Saved successfully!</p>}
        </form>
    );
}