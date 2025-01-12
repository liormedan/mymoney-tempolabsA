import React from "react";
import BalanceOverview from "./dashboard/BalanceOverview";
import TransactionManager from "./dashboard/TransactionManager";
import ExpenseAnalytics from "./dashboard/ExpenseAnalytics";
import { ThemeToggle } from "./ThemeToggle";

interface HomeProps {
  onTransactionAdd?: (data: any) => void;
  onTransactionEdit?: (transaction: any) => void;
  onTransactionDelete?: (transactionId: string) => void;
}

const Home = ({
  onTransactionAdd = () => {},
  onTransactionEdit = () => {},
  onTransactionDelete = () => {},
}: HomeProps) => {
  return (
    <div className="min-h-screen w-full bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-4xl font-bold text-foreground text-center">
            לוח בקרה פיננסי
          </h1>
          <ThemeToggle />
        </div>

        <BalanceOverview />

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-[400px]">
            <ExpenseAnalytics />
          </div>
          <div className="flex-1">
            <TransactionManager
              onTransactionAdd={onTransactionAdd}
              onTransactionEdit={onTransactionEdit}
              onTransactionDelete={onTransactionDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
