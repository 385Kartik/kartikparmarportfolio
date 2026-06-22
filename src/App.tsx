import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Suspense, lazy } from 'react';

// Lazy load pages for code splitting
const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Experience = lazy(() => import("./pages/Experience"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const BlogList = lazy(() => import("./pages/BlogList"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ResearchPaperPage = lazy(() => import("./pages/ResearchPaperPage"));
const KartikParmarPage = lazy(() => import("./pages/KartikParmarPage"));

const queryClient = new QueryClient();

const FallbackLoader = () => (
  <div className="min-h-screen bg-[#020202] flex items-center justify-center">
    <div className="w-12 h-12 border-t-2 border-l-2 border-blue-500 rounded-full animate-spin"></div>
  </div>
);

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<FallbackLoader />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/experience" element={<Experience />} />
              
              {/* Project routes */}
              <Route path="/projects/:slug" element={<ProjectDetail />} />
              
              {/* Blog routes */}
              <Route path="/blog" element={<BlogList />} />
              <Route path="/blog/:slug" element={<BlogDetail />} />
              
              <Route path="/research-paper" element={<ResearchPaperPage />} />
              <Route path="/kartik-parmar" element={<KartikParmarPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;