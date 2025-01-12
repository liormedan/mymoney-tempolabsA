import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layouts/MainLayout";
import Home from "./components/pages/Home";
import Expenses from "./components/pages/Expenses";
import Income from "./components/pages/Income";
import Statistics from "./components/pages/Statistics";
import Settings from "./components/pages/Settings";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/income" element={<Income />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </MainLayout>
    </Suspense>
  );
}

export default App;
