import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layouts/MainLayout";
import Home from "./components/pages/Home";
import Expenses from "./components/pages/Expenses";
import Income from "./components/pages/Income";
import Settings from "./components/pages/Settings";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <>
      <MainLayout>
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/income" element={<Income />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Suspense>
      </MainLayout>
      <Toaster />
    </>
  );
}

export default App;
