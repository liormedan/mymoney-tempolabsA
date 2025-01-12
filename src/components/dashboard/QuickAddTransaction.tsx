import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { he } from "date-fns/locale";

interface QuickAddTransactionProps {
  onSubmit?: (data: TransactionData) => void;
  isOpen?: boolean;
}

interface TransactionData {
  type: "income" | "expense";
  amount: number;
  date: Date;
  category: string;
}

const categories = [
  "אוכל ומסעדות",
  "תחבורה",
  "קניות",
  "חשבונות ותשתיות",
  "בידור",
  "אחר",
];

const QuickAddTransaction = ({
  onSubmit = () => {},
  isOpen = true,
}: QuickAddTransactionProps) => {
  const [date, setDate] = React.useState<Date>(new Date());
  const [type, setType] = React.useState<"income" | "expense">("expense");
  const [amount, setAmount] = React.useState("");
  const [category, setCategory] = React.useState(categories[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      type,
      amount: parseFloat(amount) || 0,
      date,
      category,
    });
  };

  return (
    <Card className="w-[400px] p-6 bg-card">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Select
            value={type}
            onValueChange={(value: "income" | "expense") => setType(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="בחר סוג" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="income">הכנסה</SelectItem>
              <SelectItem value="expense">הוצאה</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Input
            type="number"
            placeholder="סכום"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="text-right"
          />
        </div>

        <div className="space-y-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-right font-normal"
              >
                <CalendarIcon className="ml-2 h-4 w-4" />
                {date ? (
                  format(date, "PPP", { locale: he })
                ) : (
                  <span>בחר תאריך</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(date) => date && setDate(date)}
                initialFocus
                locale={he}
                className="bg-card"
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="בחר קטגוריה" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" className="w-full">
          הוסף עסקה
        </Button>
      </form>
    </Card>
  );
};

export default QuickAddTransaction;
