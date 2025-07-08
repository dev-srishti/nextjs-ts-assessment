export interface FoodItem {
    id: string;
    title: string;
    description: string;
    createdAt: string;
    image?: string | undefined;
}

export interface FoodFormValues {
    title: string;
    description: string;
}

export type FoodFormState =
    | {
        success: false;
        errors: Record<string, string[]>;
        values: FoodFormValues;
    }
    | {
        success: true;
        data: {
            id: string;
            values: FoodFormValues;
            image?: string;
            createdAt: string;
        };
        errors: Record<string, string[]>;
    }; 