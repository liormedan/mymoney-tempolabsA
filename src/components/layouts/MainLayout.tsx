import { Sidebar } from "@/components/Sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1">
        <div className="flex justify-end p-4">
          <ThemeToggle />
        </div>
        <main className="px-6 pb-6">{children}</main>
      </div>
    </div>
  );
}
