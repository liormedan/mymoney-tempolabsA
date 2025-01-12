import React from "react";
import ExpenseAnalytics from "../dashboard/ExpenseAnalytics";
import { Card } from "@/components/ui/card";

const Statistics = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-foreground text-center">
        סטטיסטיקה
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ExpenseAnalytics />
        <Card className="p-6 bg-card">
          <h2 className="text-2xl font-semibold mb-4">מגמות חודשיות</h2>
          {/* Add monthly trends chart here */}
        </Card>
      </div>
    </div>
  );
};

export default Statistics;
