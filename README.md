# Next.js Food Listing App

A simple, TypeScript‑powered Next.js App Router project that displays a virtualized list of food items, persists data in local storage, and lets you add, edit, and delete items—all in the browser.

---

## 🚀 Setup
1. **Clone the repo**  
   git clone https://github.com/dev-srishti/nextjs-ts-assessment.git
   cd your-repo

2. **Install dependencies**

    npm install

3. **Run in development**

    npm run dev

Open http://localhost:3000 in your browser.
The app will be served on port 3000 by default.


✨ **Features Overview**
1. Virtualized List
Renders large lists efficiently using react-virtualized’s <List> and <AutoSizer> so only visible rows mount, reducing DOM overhead.
2. Initial Data “from server”
On first load, static JSON data (in lib/foodItems.ts) is treated as “server” data and synced into localStorage.
3. Local Storage Persistence
All subsequent reads/writes operate against localStorage—so your adds, edits, and deletes persist across page reloads.
4. Add / Edit / Delete
A shared form component (useFormState + server action) handles both adding new items (/meals/new) and editing existing ones (/meals/[id]).

Add: Navigate to /meals/new, fill out the form, and save.
Edit: Click “Edit” on any card → /meals/<id> → make changes → save.
Delete: Click “Delete” on any item → confirm in a modal → removes item.

5. Date Formatting
Uses date-fns to display human‑friendly “Created” dates on each card.

🛠 **Tech Stack**
Next.js 15 (App Router) with TypeScript

React & React Virtualized for efficient list rendering

Tailwind CSS for utility‑first styling

date‑fns for date formatting

LocalStorage for client‑side persistence

Next.js Server Actions (useActionState) for form handling & validation

⚠️ **Known Limitations**
1. No real backend: Data lives solely in browser localStorage.
2. Basic validation: Only “title not blank” and “description ≥ 2 words”.
3. Static image fallback: Uses placeholder image; no upload or CDN support.
4. No user authentication: All users share the same list.
5. Limited accessibility: Keyboard/modal focus management can be improved.

🚧 **Future Improvements**
Backend integration: Swap localStorage for a real database or API.

User accounts: Add authentication & per‑user lists.

Image uploads: Allow users to upload images or pick from a gallery.

Advanced validation: Use a form library (e.g. react-hook-form + zod) for richer rules.

UI polish: Add animations, responsive grid layouts, and dark mode.

Accessibility: Improve focus traps in modals, ARIA roles, and keyboard navigation.

Search & Filtering: Let users search by title or filter by date/category.