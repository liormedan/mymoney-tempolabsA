import React from "react";
import ExpenseAnalytics from "../dashboard/ExpenseAnalytics";
import MonthlyTrends from "../dashboard/MonthlyTrends";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Statistics = () => {
  const [timeRange, setTimeRange] = React.useState("6");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-foreground">סטטיסטיקה</h1>
        <div className="w-[200px]">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger>
              <SelectValue placeholder="בחר טווח זמן" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3">3 חודשים אחרונים</SelectItem>
              <SelectItem value="6">6 חודשים אחרונים</SelectItem>
              <SelectItem value="12">שנה אחרונה</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MonthlyTrends />
        <ExpenseAnalytics />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-card">
          <h3 className="text-xl font-semibold mb-4">
            קטגוריות הוצאות מובילות
          </h3>
          {/* Add top spending categories component */}
        </Card>
        <Card className="p-6 bg-card">
          <h3 className="text-xl font-semibold mb-4">השוואה לתקופה קודמת</h3>
          {/* Add period comparison component */}
        </Card>
      </div>
    </div>
  );
};

export default Statistics;
