export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  description: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  displayName: string;
  settings: UserSettings;
  createdAt: string;
  updatedAt: string;
}

export interface UserSettings {
  currency: string;
  monthlyBudget: number;
  notificationsEnabled: boolean;
  categories: Category[];
}

export interface Category {
  id: string;
  name: string;
  type: "income" | "expense";
  color: string;
}

export const defaultCategories: Category[] = [
  { id: "1", name: "משכורת", type: "income", color: "#4ade80" },
  { id: "2", name: "השקעות", type: "income", color: "#60a5fa" },
  { id: "3", name: "מתנות", type: "income", color: "#f472b6" },
  { id: "4", name: "אוכל ומסעדות", type: "expense", color: "#f43f5e" },
  { id: "5", name: "תחבורה", type: "expense", color: "#fb923c" },
  { id: "6", name: "קניות", type: "expense", color: "#a78bfa" },
  { id: "7", name: "חשבונות", type: "expense", color: "#64748b" },
  { id: "8", name: "בידור", type: "expense", color: "#fbbf24" },
];

export const defaultUserSettings: UserSettings = {
  currency: "₪",
  monthlyBudget: 5000,
  notificationsEnabled: true,
  categories: defaultCategories,
};
