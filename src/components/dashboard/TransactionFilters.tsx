import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon, Search, X } from "lucide-react";
import { format } from "date-fns";
import { he } from "date-fns/locale";

export interface TransactionFilters {
  search?: string;
  category?: string;
  dateFrom?: Date;
  dateTo?: Date;
}

interface TransactionFiltersProps {
  onFiltersChange: (filters: TransactionFilters) => void;
  categories: string[];
}

const TransactionFilters = ({
  onFiltersChange,
  categories,
}: TransactionFiltersProps) => {
  const [filters, setFilters] = React.useState<TransactionFilters>({});

  const handleFilterChange = (newFilters: Partial<TransactionFilters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const handleClearFilters = () => {
    setFilters({});
    onFiltersChange({});
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 items-end mb-4">
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="חפש עסקאות..."
            value={filters.search || ""}
            onChange={(e) => handleFilterChange({ search: e.target.value })}
            className="pl-8 text-right"
          />
        </div>
      </div>

      <div className="w-full md:w-[200px]">
        <Select
          value={filters.category}
          onValueChange={(value) => handleFilterChange({ category: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="כל הקטגוריות" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={`justify-start text-right font-normal ${
                filters.dateFrom ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              <CalendarIcon className="ml-2 h-4 w-4" />
              {filters.dateFrom ? (
                format(filters.dateFrom, "P", { locale: he })
              ) : (
                <span>מתאריך</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={filters.dateFrom}
              onSelect={(date) => handleFilterChange({ dateFrom: date })}
              initialFocus
              locale={he}
            />
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={`justify-start text-right font-normal ${
                filters.dateTo ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              <CalendarIcon className="ml-2 h-4 w-4" />
              {filters.dateTo ? (
                format(filters.dateTo, "P", { locale: he })
              ) : (
                <span>עד תאריך</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={filters.dateTo}
              onSelect={(date) => handleFilterChange({ dateTo: date })}
              initialFocus
              locale={he}
            />
          </PopoverContent>
        </Popover>

        {(filters.search ||
          filters.category ||
          filters.dateFrom ||
          filters.dateTo) && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClearFilters}
            className="px-2"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default TransactionFilters;
