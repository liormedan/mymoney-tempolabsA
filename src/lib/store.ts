import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  onSnapshot,
  Unsubscribe,
} from "firebase/firestore";
import { db } from "./firebase";
import { useAuthStore } from "./auth";
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
  loading: boolean;
  error: string | null;
  unsubscribe: Unsubscribe | null;
  addTransaction: (
    transaction: Omit<Transaction, "id" | "createdAt" | "updatedAt" | "userId">,
  ) => Promise<void>;
  updateTransaction: (
    id: string,
    transaction: Partial<Transaction>,
  ) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  addCategory: (category: Omit<Category, "id">) => Promise<void>;
  updateCategory: (id: string, category: Partial<Category>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  updateSettings: (settings: Partial<UserSettings>) => Promise<void>;
  initializeListeners: () => void;
  cleanup: () => void;
};

export const useFinanceStore = create<State>(
  persist(
    (set, get) => ({
      transactions: [],
      categories: defaultCategories,
      settings: defaultUserSettings,
      loading: false,
      error: null,
      unsubscribe: null,

      initializeListeners: () => {
        const user = useAuthStore.getState().user;
        if (!user) return;

        // Cleanup previous listener if exists
        get().cleanup();

        // Listen to transactions
        const q = query(
          collection(db, "transactions"),
          where("userId", "==", user.uid),
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
          const transactions: Transaction[] = [];
          snapshot.forEach((doc) => {
            transactions.push({ id: doc.id, ...doc.data() } as Transaction);
          });
          set({ transactions });
        });

        set({ unsubscribe });
      },

      cleanup: () => {
        const { unsubscribe } = get();
        if (unsubscribe) {
          unsubscribe();
          set({ unsubscribe: null, transactions: [] });
        }
      },

      addTransaction: async (transaction) => {
        const user = useAuthStore.getState().user;
        if (!user) throw new Error("משתמש לא מחובר");

        try {
          set({ loading: true, error: null });
          const newTransaction: Omit<Transaction, "id"> = {
            userId: user.uid,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            ...transaction,
          };
          await addDoc(collection(db, "transactions"), newTransaction);
        } catch (error) {
          set({ error: "שגיאה בהוספת העסקה" });
          throw error;
        } finally {
          set({ loading: false });
        }
      },

      updateTransaction: async (id, transaction) => {
        try {
          set({ loading: true, error: null });
          const ref = doc(db, "transactions", id);
          await updateDoc(ref, {
            ...transaction,
            updatedAt: new Date().toISOString(),
          });
        } catch (error) {
          set({ error: "שגיאה בעדכון העסקה" });
          throw error;
        } finally {
          set({ loading: false });
        }
      },

      deleteTransaction: async (id) => {
        try {
          set({ loading: true, error: null });
          await deleteDoc(doc(db, "transactions", id));
        } catch (error) {
          set({ error: "שגיאה במחיקת העסקה" });
          throw error;
        } finally {
          set({ loading: false });
        }
      },

      addCategory: async (category) => {
        const newCategory: Category = {
          id: Math.random().toString(36).substring(2, 9),
          ...category,
        };
        set((state) => ({
          categories: [...state.categories, newCategory],
        }));
      },

      updateCategory: async (id, category) => {
        set((state) => ({
          categories: state.categories.map((c) =>
            c.id === id ? { ...c, ...category } : c,
          ),
        }));
      },

      deleteCategory: async (id) => {
        set((state) => ({
          categories: state.categories.filter((c) => c.id !== id),
        }));
      },

      updateSettings: async (newSettings) => {
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        }));
      },
    }),
    {
      name: "finance-store",
      partialize: (state) => ({
        categories: state.categories,
        settings: state.settings,
      }),
    },
  ),
);

// Cleanup listeners when auth state changes
useAuthStore.subscribe((state, prevState) => {
  if (prevState.user && !state.user) {
    useFinanceStore.getState().cleanup();
  }
});
