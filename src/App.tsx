
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { SEOLayout } from "@/components/layout/SEOLayout";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Support from "./pages/Support";
import Careers from "./pages/Careers";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";

// Admin routes
import AdminAuth from "./pages/admin/Auth";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/Products";
import AdminProjects from "./pages/admin/Projects";
import AdminProjectForm from "./pages/admin/ProjectForm";
import AdminServices from "./pages/admin/Services";
import AdminMessages from "./pages/admin/Messages";
import AdminUsers from "./pages/admin/Users";
import AdminDocuments from "./pages/admin/Documents";
import AdminSupport from "./pages/admin/Support";
import AdminCareers from "./pages/admin/Careers";
import AdminLocations from "./pages/admin/Locations";
import AdminManageContent from "./pages/admin/ManageContent";
import AdminManageStats from "./pages/admin/ManageStats";
import AdminManageDocuments from "./pages/admin/ManageDocuments";
import AdminManageSupport from "./pages/admin/ManageSupport";
import AdminManageCareers from "./pages/admin/ManageCareers";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <TooltipProvider>
          <BrowserRouter>
            <SEOLayout>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Index />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:slug" element={<ProjectDetail />} />
                <Route path="/services" element={<Services />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/support" element={<Support />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                
                {/* Admin routes */}
                <Route path="/admin" element={<AdminAuth />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/products" element={<AdminProducts />} />
                <Route path="/admin/projects" element={<AdminProjects />} />
                <Route path="/admin/projects/new" element={<AdminProjectForm />} />
                <Route path="/admin/projects/:id/edit" element={<AdminProjectForm />} />
                <Route path="/admin/services" element={<AdminServices />} />
                <Route path="/admin/messages" element={<AdminMessages />} />
                <Route path="/admin/users" element={<AdminUsers />} />
                <Route path="/admin/documents" element={<AdminDocuments />} />
                <Route path="/admin/support" element={<AdminSupport />} />
                <Route path="/admin/careers" element={<AdminCareers />} />
                <Route path="/admin/locations" element={<AdminLocations />} />
                <Route path="/admin/content" element={<AdminManageContent />} />
                <Route path="/admin/stats" element={<AdminManageStats />} />
                <Route path="/admin/manage-documents" element={<AdminManageDocuments />} />
                <Route path="/admin/manage-support" element={<AdminManageSupport />} />
                <Route path="/admin/manage-careers" element={<AdminManageCareers />} />
                
                {/* 404 route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </SEOLayout>
          </BrowserRouter>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
