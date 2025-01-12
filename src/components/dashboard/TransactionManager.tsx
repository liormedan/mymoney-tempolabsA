import React from "react";
import { Card } from "@/components/ui/card";
import QuickAddTransaction from "./QuickAddTransaction";
import TransactionList from "./TransactionList";

interface TransactionManagerProps {
  onTransactionAdd?: (data: any) => void;
  onTransactionEdit?: (transaction: any) => void;
  onTransactionDelete?: (transactionId: string) => void;
  isQuickAddOpen?: boolean;
}

const TransactionManager = ({
  onTransactionAdd = () => {},
  onTransactionEdit = () => {},
  onTransactionDelete = () => {},
  isQuickAddOpen = true,
}: TransactionManagerProps) => {
  return (
    <Card className="w-full p-6 bg-card space-y-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-[400px]">
          <QuickAddTransaction
            onSubmit={onTransactionAdd}
            isOpen={isQuickAddOpen}
          />
        </div>
        <div className="flex-1">
          <TransactionList
            onEdit={onTransactionEdit}
            onDelete={onTransactionDelete}
          />
        </div>
      </div>
    </Card>
  );
};

export default TransactionManager;
