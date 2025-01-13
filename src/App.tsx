import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "./components/layouts/MainLayout";
import Home from "./components/pages/Home";
import Expenses from "./components/pages/Expenses";
import Income from "./components/pages/Income";
import Settings from "./components/pages/Settings";
import Login from "./components/pages/Login";
import { Toaster } from "sonner";
import { useAuthStore } from "./lib/auth";

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-foreground">טוען...</div>
    </div>
  );
}

function App() {
  const { user, loading } = useAuthStore();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route
            path="/login"
            element={user ? <Navigate to="/" replace /> : <Login />}
          />
          <Route
            path="/*"
            element={
              user ? (
                <MainLayout>
                  <Routes>
                    <Route index element={<Home />} />
                    <Route path="expenses" element={<Expenses />} />
                    <Route path="income" element={<Income />} />
                    <Route path="settings" element={<Settings />} />
                  </Routes>
                </MainLayout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </Suspense>
      <Toaster richColors position="top-center" />
    </>
  );
}

export default App;
