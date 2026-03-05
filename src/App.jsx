import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { useTheme } from "@/hooks/useTheme";
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Dashboard from "@/pages/Dashboard";
import MySnippets from "@/pages/MySnippets";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const { isDark, toggle } = useTheme();

  return (
    <Routes>
      {/* Public pages */}
      <Route path="/" element={<Landing isDark={isDark} toggleTheme={toggle} />} />
      <Route path="/login" element={<Login isDark={isDark} toggleTheme={toggle} />} />
      <Route path="/signup" element={<Signup isDark={isDark} toggleTheme={toggle} />} />

      {/* App pages */}
      <Route element={<AppLayout isDark={isDark} toggleTheme={toggle} />}>
        <Route path="/dashboard" element={<Dashboard isDark={isDark} />} />
        <Route path="/snippets" element={<MySnippets />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
