import React from "react";
import BalanceOverview from "../dashboard/BalanceOverview";
import TransactionManager from "../dashboard/TransactionManager";
import ExpenseAnalytics from "../dashboard/ExpenseAnalytics";
import { useFinanceStore } from "@/lib/store";

const Home = () => {
  const { transactions, addTransaction, updateTransaction, deleteTransaction } =
    useFinanceStore();

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalBalance = totalIncome - totalExpenses;

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      <h1 className="text-4xl font-bold text-foreground text-center">
        לוח בקרה פיננסי
      </h1>

      <BalanceOverview
        totalBalance={totalBalance}
        totalIncome={totalIncome}
        totalExpenses={totalExpenses}
      />

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-[400px]">
          <ExpenseAnalytics />
        </div>
        <div className="flex-1 min-w-0">
          <TransactionManager
            onTransactionAdd={addTransaction}
            onTransactionEdit={updateTransaction}
            onTransactionDelete={deleteTransaction}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
