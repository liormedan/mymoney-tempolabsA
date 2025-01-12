import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useFinanceStore } from "@/lib/store";
import { Plus, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Settings = () => {
  const { settings, categories, updateSettings, addCategory, deleteCategory } =
    useFinanceStore();
  const { toast } = useToast();
  const [newCategoryName, setNewCategoryName] = React.useState("");
  const [newCategoryType, setNewCategoryType] = React.useState<
    "income" | "expense"
  >("expense");

  const handleAddCategory = () => {
    if (!newCategoryName) return;

    addCategory({
      name: newCategoryName,
      type: newCategoryType,
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    });

    setNewCategoryName("");
    toast({
      title: "קטגוריה נוספה",
      description: `הקטגוריה ${newCategoryName} נוספה בהצלחה`,
    });
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-foreground text-center">הגדרות</h1>

      <Card className="p-6 bg-card">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">הגדרות כלליות</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="notifications">התראות</Label>
                <Switch
                  id="notifications"
                  checked={settings.notificationsEnabled}
                  onCheckedChange={(checked) =>
                    updateSettings({ notificationsEnabled: checked })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currency">מטבע ברירת מחדל</Label>
                <Input
                  id="currency"
                  value={settings.currency}
                  onChange={(e) => updateSettings({ currency: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget">תקציב חודשי</Label>
                <Input
                  id="budget"
                  type="number"
                  value={settings.monthlyBudget}
                  onChange={(e) =>
                    updateSettings({ monthlyBudget: Number(e.target.value) })
                  }
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">ניהול קטגוריות</h2>

            <div className="flex gap-2">
              <Input
                placeholder="שם הקטגוריה"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
              />
              <select
                className="px-3 py-2 border rounded-md"
                value={newCategoryType}
                onChange={(e) =>
                  setNewCategoryType(e.target.value as "income" | "expense")
                }
              >
                <option value="expense">הוצאה</option>
                <option value="income">הכנסה</option>
              </select>
              <Button onClick={handleAddCategory}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="flex items-center justify-between p-3 border rounded-md"
                  style={{ borderColor: category.color }}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    <span>{category.name}</span>
                    <span className="text-sm text-muted-foreground">
                      ({category.type === "income" ? "הכנסה" : "הוצאה"})
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteCategory(category.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Settings;
