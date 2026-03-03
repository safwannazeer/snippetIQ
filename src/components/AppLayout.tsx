import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { ThemeToggle } from "@/components/ThemeToggle";

interface AppLayoutProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export function AppLayout({ isDark, toggleTheme }: AppLayoutProps) {
  return (
    <div className="flex h-screen w-full bg-background transition-theme">
      <AppSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-14 items-center justify-end border-b border-border px-6 transition-theme">
          <ThemeToggle isDark={isDark} toggle={toggleTheme} />
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
