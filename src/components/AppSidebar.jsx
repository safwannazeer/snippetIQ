import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Code2, LogOut } from "lucide-react";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/snippets", label: "My Snippets", icon: Code2 },
];

export function AppSidebar() {
  const navigate = useNavigate();

  return (
    <aside className="flex h-screen w-60 shrink-0 flex-col border-r border-sidebar-border bg-sidebar transition-theme">
      {/* Brand */}
      <div className="flex items-center gap-2 px-5 py-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <Code2 className="h-4 w-4 text-primary-foreground" />
        </div>
        <span className="text-lg font-bold tracking-tight text-sidebar-foreground">
          Snippet<span className="text-primary">IQ</span>
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-2 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                isActive
                  ? "bg-sidebar-accent text-primary border-l-2 border-primary"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              }`
            }
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="border-t border-sidebar-border px-3 py-3">
        <button
          onClick={() => navigate("/")}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}
