import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { useTheme } from "@/hooks/useTheme";
import Dashboard from "@/pages/Dashboard";
import MySnippets from "@/pages/MySnippets";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const { isDark, toggle } = useTheme();

  return (
    <Routes>
      <Route element={<AppLayout isDark={isDark} toggleTheme={toggle} />}>
        <Route path="/" element={<Dashboard isDark={isDark} />} />
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
