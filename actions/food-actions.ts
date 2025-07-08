export async function saveFood(prevState: any, formData: FormData) {
    const title = formData.get("title")?.toString().trim() || "";
    const description = formData.get("description")?.toString().trim() || "";
    const id = formData.get("id")?.toString();
    const isNewItem = id === 'new';
    const errors: Record<string, string[]> = {};

    const values = { title, description };

    if (!title) {
        errors.title = ["Title cannot be blank"];
    }

    const wordCount = description.split(/\s+/).length;
    if (wordCount < 2) {
        errors.description = ["Description must be at least 2 words"];
    }

    if (Object.keys(errors).length > 0) {
        return { success: false as const, errors, values };
    }

    const newItem = {
        id: (id && !isNewItem) ? id : Math.random().toString(36).slice(2),
        values: { title, description}, 
        ...(id ? {} : { image: "placeholder.jpg" }),
        createdAt: new Date().toISOString(),
    };

    return { success: true as const, data: newItem, errors: {} };
}