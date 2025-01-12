import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Pencil, Trash } from "lucide-react";

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: "income" | "expense";
  category: string;
}

interface TransactionListProps {
  transactions?: Transaction[];
  onEdit?: (transaction: Transaction) => void;
  onDelete?: (transactionId: string) => void;
}

const defaultTransactions: Transaction[] = [
  {
    id: "1",
    date: "2024-01-15",
    description: "קניות במכולת",
    amount: 150.5,
    type: "expense",
    category: "אוכל",
  },
  {
    id: "2",
    date: "2024-01-14",
    description: "משכורת",
    amount: 3000.0,
    type: "income",
    category: "משכורת",
  },
  {
    id: "3",
    date: "2024-01-13",
    description: "חשבון אינטרנט",
    amount: 59.99,
    type: "expense",
    category: "תשתיות",
  },
];

const TransactionList = ({
  transactions = defaultTransactions,
  onEdit = () => {},
  onDelete = () => {},
}: TransactionListProps) => {
  return (
    <Card className="w-full h-[400px] bg-card p-4">
      <ScrollArea className="h-full w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-muted-foreground">תאריך</TableHead>
              <TableHead className="text-muted-foreground">תיאור</TableHead>
              <TableHead className="text-muted-foreground">קטגוריה</TableHead>
              <TableHead className="text-left text-muted-foreground">
                סכום
              </TableHead>
              <TableHead className="w-[50px] text-muted-foreground">
                פעולות
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="text-card-foreground">
                  {transaction.date}
                </TableCell>
                <TableCell className="text-card-foreground">
                  {transaction.description}
                </TableCell>
                <TableCell className="text-card-foreground">
                  {transaction.category}
                </TableCell>
                <TableCell
                  className={`text-left ${
                    transaction.type === "income"
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {transaction.type === "income" ? "+" : "-"}₪
                  {transaction.amount.toFixed(2)}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => onEdit(transaction)}
                        className="cursor-pointer"
                      >
                        <Pencil className="h-4 w-4 ml-2" />
                        ערוך
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onDelete(transaction.id)}
                        className="cursor-pointer text-red-600 dark:text-red-400"
                      >
                        <Trash className="h-4 w-4 ml-2" />
                        מחק
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </Card>
  );
};

export default TransactionList;