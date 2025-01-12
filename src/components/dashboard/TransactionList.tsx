import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import TransactionFilters, {
  TransactionFilters as Filters,
} from "./TransactionFilters";
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
import { MoreVertical, Pencil, Trash, Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export interface Transaction {
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
  onDelete?: (transactionId: string) => Promise<void>;
  isLoading?: boolean;
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
  onDelete = async () => {},
  isLoading = false,
}: TransactionListProps) => {
  const [filteredTransactions, setFilteredTransactions] =
    React.useState(transactions);

  React.useEffect(() => {
    setFilteredTransactions(transactions);
  }, [transactions]);

  const handleFiltersChange = (filters: Filters) => {
    let filtered = [...transactions];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.description.toLowerCase().includes(searchLower) ||
          t.category.toLowerCase().includes(searchLower),
      );
    }

    if (filters.category) {
      filtered = filtered.filter((t) => t.category === filters.category);
    }

    if (filters.dateFrom) {
      filtered = filtered.filter((t) => new Date(t.date) >= filters.dateFrom!);
    }

    if (filters.dateTo) {
      filtered = filtered.filter((t) => new Date(t.date) <= filters.dateTo!);
    }

    setFilteredTransactions(filtered);
  };

  const { toast } = useToast();
  const [deletingId, setDeletingId] = React.useState<string | null>(null);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleDelete = async (id: string) => {
    try {
      setIsDeleting(true);
      await onDelete(id);
      toast.success("העסקה נמחקה בהצלחה");
    } catch (error) {
      toast.error("שגיאה במחיקת העסקה");
    } finally {
      setIsDeleting(false);
      setDeletingId(null);
    }
  };

  if (isLoading) {
    return (
      <Card className="w-full h-[400px] bg-card p-4 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </Card>
    );
  }

  return (
    <Card className="w-full h-[400px] bg-card p-4">
      <TransactionFilters
        onFiltersChange={handleFiltersChange}
        categories={Array.from(new Set(transactions.map((t) => t.category)))}
      />
      <div className="h-[calc(100%-80px)]">
        <ScrollArea className="h-full w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right text-muted-foreground">
                  תאריך
                </TableHead>
                <TableHead className="text-right text-muted-foreground">
                  תיאור
                </TableHead>
                <TableHead className="text-right text-muted-foreground">
                  קטגוריה
                </TableHead>
                <TableHead className="text-left text-muted-foreground">
                  סכום
                </TableHead>
                <TableHead className="w-[50px] text-right text-muted-foreground">
                  פעולות
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="text-right text-card-foreground">
                    {transaction.date}
                  </TableCell>
                  <TableCell className="text-right text-card-foreground">
                    {transaction.description}
                  </TableCell>
                  <TableCell className="text-right text-card-foreground">
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
                  <TableCell className="text-right">
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
                          onClick={() => setDeletingId(transaction.id)}
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
      </div>

      <AlertDialog open={!!deletingId} onOpenChange={() => setDeletingId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>האם אתה בטוח?</AlertDialogTitle>
            <AlertDialogDescription>
              פעולה זו תמחק את העסקה לצמיתות ולא ניתן יהיה לשחזר אותה.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>ביטול</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletingId && handleDelete(deletingId)}
              className="bg-red-600 hover:bg-red-700"
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  מוחק...
                </>
              ) : (
                "מחק"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};

export default TransactionList;
