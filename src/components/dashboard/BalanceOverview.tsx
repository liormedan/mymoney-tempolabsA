import React from "react";
import { Card } from "@/components/ui/card";
import { ArrowDownIcon, ArrowUpIcon, DollarSign } from "lucide-react";

interface BalanceOverviewProps {
  totalBalance?: number;
  totalIncome?: number;
  totalExpenses?: number;
}

const BalanceOverview = ({
  totalBalance = 5250.75,
  totalIncome = 8500.0,
  totalExpenses = 3249.25,
}: BalanceOverviewProps) => {
  return (
    <div className="w-full p-6 bg-background">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-card">
          <div className="flex items-center justify-between">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-1 text-right">
              <p className="text-sm text-muted-foreground">יתרה כוללת</p>
              <h2 className="text-3xl font-bold text-card-foreground">
                ₪{totalBalance.toFixed(2)}
              </h2>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-card">
          <div className="flex items-center justify-between">
            <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <ArrowUpIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="space-y-1 text-right">
              <p className="text-sm text-muted-foreground">סך הכנסות</p>
              <h2 className="text-3xl font-bold text-green-600 dark:text-green-400">
                ₪{totalIncome.toFixed(2)}
              </h2>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-card">
          <div className="flex items-center justify-between">
            <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
              <ArrowDownIcon className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <div className="space-y-1 text-right">
              <p className="text-sm text-muted-foreground">סך הוצאות</p>
              <h2 className="text-3xl font-bold text-red-600 dark:text-red-400">
                ₪{totalExpenses.toFixed(2)}
              </h2>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BalanceOverview;
