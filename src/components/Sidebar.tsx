import {
  LayoutDashboard,
  Receipt,
  TrendingUp,
  BarChart2,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  {
    title: "לוח בקרה",
    icon: LayoutDashboard,
    href: "/",
  },
  {
    title: "הוצאות",
    icon: Receipt,
    href: "/expenses",
  },
  {
    title: "הכנסות",
    icon: TrendingUp,
    href: "/income",
  },
  {
    title: "סטטיסטיקה",
    icon: BarChart2,
    href: "/statistics",
  },
  {
    title: "הגדרות",
    icon: Settings,
    href: "/settings",
  },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="h-screen w-64 bg-card border-l">
      <div className="flex flex-col gap-2 p-4">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Button
              key={item.href}
              variant={isActive ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start gap-2",
                isActive && "bg-secondary",
              )}
              asChild
            >
              <Link to={item.href}>
                <item.icon className="h-5 w-5" />
                {item.title}
              </Link>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
