import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  Transaction,
  Category,
  defaultCategories,
  UserSettings,
  defaultUserSettings,
} from "@/types/finance";

type State = {
  transactions: Transaction[];
  categories: Category[];
  settings: UserSettings;
  addTransaction: (
    transaction: Omit<Transaction, "id" | "createdAt" | "updatedAt">,
  ) => void;
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  addCategory: (category: Omit<Category, "id">) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  updateSettings: (settings: Partial<UserSettings>) => void;
};

export const useFinanceStore = create<State>(
  persist(
    (set) => ({
      transactions: [],
      categories: defaultCategories,
      settings: defaultUserSettings,

      // Transaction actions
      addTransaction: (transaction) => {
        const newTransaction: Transaction = {
          id: Math.random().toString(36).substring(2, 9),
          userId: "temp-user",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          ...transaction,
        };
        set((state) => ({
          transactions: [...state.transactions, newTransaction],
        }));
      },
      updateTransaction: (id, transaction) =>
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === id
              ? { ...t, ...transaction, updatedAt: new Date().toISOString() }
              : t,
          ),
        })),
      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        })),

      // Category actions
      addCategory: (category) => {
        const newCategory: Category = {
          id: Math.random().toString(36).substring(2, 9),
          ...category,
        };
        set((state) => ({
          categories: [...state.categories, newCategory],
        }));
      },
      updateCategory: (id, category) =>
        set((state) => ({
          categories: state.categories.map((c) =>
            c.id === id ? { ...c, ...category } : c,
          ),
        })),
      deleteCategory: (id) =>
        set((state) => ({
          categories: state.categories.filter((c) => c.id !== id),
        })),

      // Settings actions
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),
    }),
    {
      name: "finance-store",
    },
  ),
);
