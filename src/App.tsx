import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "@/features/startups/pages/Index";
import Incubators from "@/features/incubators/pages/Incubators";
import Accelerators from "@/features/accelerators/pages/Accelerators";
import CoworkingSpaces from "@/features/coworking-spaces/pages/CoworkingSpaces";
import Media from "@/features/media/pages/Index";
import Jobs from "@/features/jobs/pages/Index";
import NotFound from "@/shared/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/incubators" element={<Incubators />} />
          <Route path="/accelerators" element={<Accelerators />} />
          <Route path="/coworking-spaces" element={<CoworkingSpaces />} />
          <Route path="/media" element={<Media />} />
          <Route path="/jobs" element={<Jobs />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
