import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const Settings = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-foreground text-center">הגדרות</h1>

      <Card className="p-6 bg-card">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">הגדרות כלליות</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="notifications">התראות</Label>
                <Switch id="notifications" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currency">מטבע ברירת מחדל</Label>
                <Input id="currency" defaultValue="₪" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget">תקציב חודשי</Label>
                <Input id="budget" type="number" defaultValue="5000" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">גיבוי ושחזור</h2>
            <div className="space-y-4">
              <Button variant="outline" className="w-full">
                גבה נתונים
              </Button>
              <Button variant="outline" className="w-full">
                שחזר מגיבוי
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Settings;
