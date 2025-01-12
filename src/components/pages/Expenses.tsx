import React from "react";
import TransactionManager from "../dashboard/TransactionManager";

const Expenses = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-foreground text-center">הוצאות</h1>
      <TransactionManager />
    </div>
  );
};

export default Expenses;
