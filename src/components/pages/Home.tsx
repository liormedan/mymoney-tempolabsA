import React from "react";
import BalanceOverview from "../dashboard/BalanceOverview";
import TransactionManager from "../dashboard/TransactionManager";
import ExpenseAnalytics from "../dashboard/ExpenseAnalytics";

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
    <div className="space-y-6 max-w-[1400px] mx-auto">
      <h1 className="text-4xl font-bold text-foreground text-center">
        לוח בקרה פיננסי
      </h1>

      <BalanceOverview />

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-[400px]">
          <ExpenseAnalytics />
        </div>
        <div className="flex-1 min-w-0">
          <TransactionManager
            onTransactionAdd={onTransactionAdd}
            onTransactionEdit={onTransactionEdit}
            onTransactionDelete={onTransactionDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
