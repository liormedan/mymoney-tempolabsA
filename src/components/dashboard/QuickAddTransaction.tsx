import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { he } from "date-fns/locale";

const formSchema = z.object({
  type: z.enum(["income", "expense"]),
  amount: z.number().positive("הסכום חייב להיות חיובי"),
  date: z.date(),
  category: z.string().min(1, "יש לבחור קטגוריה"),
});

type FormData = z.infer<typeof formSchema>;

interface QuickAddTransactionProps {
  onSubmit?: (data: FormData) => Promise<void>;
  isOpen?: boolean;
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
  onSubmit = async () => {},
  isOpen = true,
}: QuickAddTransactionProps) => {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "expense",
      date: new Date(),
      category: categories[0],
    },
  });

  const onSubmitForm = async (data: FormData) => {
    try {
      await onSubmit(data);
      toast.success("העסקה נוספה בהצלחה");
      reset();
    } catch (error) {
      toast.error("שגיאה בהוספת העסקה");
    }
  };

  const date = watch("date");

  return (
    <Card className="w-full max-w-[400px] p-6 bg-card">
      <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
        <div className="space-y-2">
          <Select
            value={watch("type")}
            onValueChange={(value: "income" | "expense") =>
              setValue("type", value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="בחר סוג" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="income">הכנסה</SelectItem>
              <SelectItem value="expense">הוצאה</SelectItem>
            </SelectContent>
          </Select>
          {errors.type && (
            <p className="text-sm text-destructive">{errors.type.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Input
            type="number"
            placeholder="סכום"
            {...register("amount", { valueAsNumber: true })}
            className="text-right"
          />
          {errors.amount && (
            <p className="text-sm text-destructive">{errors.amount.message}</p>
          )}
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
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(date) => date && setValue("date", date)}
                initialFocus
                locale={he}
                className="bg-card"
              />
            </PopoverContent>
          </Popover>
          {errors.date && (
            <p className="text-sm text-destructive">{errors.date.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Select
            value={watch("category")}
            onValueChange={(value) => setValue("category", value)}
          >
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
          {errors.category && (
            <p className="text-sm text-destructive">
              {errors.category.message}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              מוסיף...
            </>
          ) : (
            "הוסף עסקה"
          )}
        </Button>
      </form>
    </Card>
  );
};

export default QuickAddTransaction;
