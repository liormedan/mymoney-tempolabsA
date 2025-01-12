import React from "react";
import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type MonthlyData = {
  month: string;
  income: number;
  expenses: number;
  balance: number;
};

type MonthlyTrendsProps = {
  data?: MonthlyData[];
};

const defaultData = [
  {
    month: "ינואר",
    income: 8500,
    expenses: 6200,
    balance: 2300,
  },
  {
    month: "פברואר",
    income: 9200,
    expenses: 5800,
    balance: 3400,
  },
  {
    month: "מרץ",
    income: 8800,
    expenses: 6500,
    balance: 2300,
  },
  {
    month: "אפריל",
    income: 9500,
    expenses: 7000,
    balance: 2500,
  },
  {
    month: "מאי",
    income: 10000,
    expenses: 6800,
    balance: 3200,
  },
  {
    month: "יוני",
    income: 9800,
    expenses: 7200,
    balance: 2600,
  },
];

function MonthlyTrends({ data = defaultData }: MonthlyTrendsProps) {
  return (
    <Card className="w-full h-[400px] p-6 bg-card">
      <h3 className="text-xl font-semibold">מגמות חודשיות</h3>
      <div className="h-[calc(100%-2rem)] w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" tick={{ fill: "var(--foreground)" }} />
            <YAxis
              tick={{ fill: "var(--foreground)" }}
              tickFormatter={(value) => `₪${value}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
              }}
              formatter={(value: number) => [`₪${value}`, ""]}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="income"
              name="הכנסות"
              stroke="#4ade80"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="expenses"
              name="הוצאות"
              stroke="#f43f5e"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="balance"
              name="יתרה"
              stroke="#60a5fa"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export default MonthlyTrends;
