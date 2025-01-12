import React from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, BarChart } from "lucide-react";

interface ExpenseCategory {
  category: string;
  amount: number;
  percentage: number;
  color: string;
}

interface ExpenseAnalyticsProps {
  data?: ExpenseCategory[];
}

const defaultData: ExpenseCategory[] = [
  {
    category: "אוכל ומסעדות",
    amount: 450.5,
    percentage: 30,
    color: "#FF6B6B",
  },
  {
    category: "תחבורה",
    amount: 300.0,
    percentage: 20,
    color: "#4ECDC4",
  },
  { category: "קניות", amount: 225.75, percentage: 15, color: "#45B7D1" },
  {
    category: "חשבונות ותשתיות",
    amount: 375.25,
    percentage: 25,
    color: "#96CEB4",
  },
  {
    category: "בידור",
    amount: 150.5,
    percentage: 10,
    color: "#FFEEAD",
  },
];

const ExpenseAnalytics = ({ data = defaultData }: ExpenseAnalyticsProps) => {
  return (
    <Card className="w-[400px] h-[300px] p-4 bg-card">
      <Tabs defaultValue="pie" className="h-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList className="bg-muted">
            <TabsTrigger value="pie">
              <PieChart className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="bar">
              <BarChart className="h-4 w-4" />
            </TabsTrigger>
          </TabsList>
          <h3 className="font-semibold text-lg text-card-foreground">
            פילוח הוצאות
          </h3>
        </div>

        <TabsContent value="pie" className="h-[calc(100%-60px)]">
          <div className="relative h-full">
            <svg viewBox="0 0 100 100" className="w-48 h-48 mx-auto">
              {data.map((item, index) => {
                const startAngle = data
                  .slice(0, index)
                  .reduce((sum, curr) => sum + curr.percentage, 0);
                const endAngle = startAngle + item.percentage;

                const x1 = 50 + 40 * Math.cos((2 * Math.PI * startAngle) / 100);
                const y1 = 50 + 40 * Math.sin((2 * Math.PI * startAngle) / 100);
                const x2 = 50 + 40 * Math.cos((2 * Math.PI * endAngle) / 100);
                const y2 = 50 + 40 * Math.sin((2 * Math.PI * endAngle) / 100);

                const largeArcFlag = item.percentage > 50 ? 1 : 0;

                return (
                  <path
                    key={item.category}
                    d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                    fill={item.color}
                  />
                );
              })}
            </svg>
          </div>
        </TabsContent>

        <TabsContent value="bar" className="h-[calc(100%-60px)]">
          <div className="h-full flex items-end space-x-2">
            {data.map((item) => (
              <div
                key={item.category}
                className="flex-1 flex flex-col items-center"
              >
                <div
                  className="w-full rounded-t"
                  style={{
                    backgroundColor: item.color,
                    height: `${item.percentage}%`,
                  }}
                />
                <span className="text-xs mt-1 truncate w-full text-center text-card-foreground">
                  {item.category}
                </span>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default ExpenseAnalytics;
