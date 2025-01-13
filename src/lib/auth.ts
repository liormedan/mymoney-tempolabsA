import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser,
  browserLocalPersistence,
  setPersistence,
} from "firebase/auth";
import { auth } from "./firebase";
import { create } from "zustand";

type AuthStore = {
  user: FirebaseUser | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  reset: () => void;
};

// Initialize auth store
export const useAuthStore = create<AuthStore>((set) => {
  // Set persistence to LOCAL
  setPersistence(auth, browserLocalPersistence).catch(console.error);

  // Set up auth state listener
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    set({ user, loading: false });
  });

  return {
    user: null,
    loading: true,
    error: null,

    signIn: async (email: string, password: string) => {
      try {
        set({ loading: true, error: null });
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        console.error("Sign in error:", error);
        set({ error: "שגיאה בהתחברות" });
        throw error;
      } finally {
        set({ loading: false });
      }
    },

    signUp: async (email: string, password: string) => {
      try {
        set({ loading: true, error: null });
        await createUserWithEmailAndPassword(auth, email, password);
      } catch (error) {
        console.error("Sign up error:", error);
        set({ error: "שגיאה בהרשמה" });
        throw error;
      } finally {
        set({ loading: false });
      }
    },

    signOut: async () => {
      try {
        set({ loading: true, error: null });
        await firebaseSignOut(auth);
      } catch (error) {
        console.error("Sign out error:", error);
        set({ error: "שגיאה בהתנתקות" });
        throw error;
      } finally {
        set({ loading: false });
      }
    },

    reset: () => {
      set({ user: null, loading: false, error: null });
    },
  };
});
