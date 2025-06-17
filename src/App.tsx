
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { SEOLayout } from "@/components/layout/SEOLayout";
import AppLoader from "@/components/common/AppLoader";
import { useAppLoading } from "@/hooks/useAppLoading";
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
import AdminLayout from "./pages/admin/Layout";
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
      retry: 2,
    },
  },
});

function App() {
  const { isLoading } = useAppLoading();

  if (isLoading) {
    return <AppLoader />;
  }

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
                
                {/* Admin auth routes (outside of AdminLayout) */}
                <Route path="/admin" element={<AdminAuth />} />
                <Route path="/admin/login" element={<AdminAuth />} />
                
                {/* Admin routes (wrapped in AdminLayout) */}
                <Route path="/admin/*" element={<AdminLayout />}>
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="products" element={<AdminProducts />} />
                  <Route path="projects" element={<AdminProjects />} />
                  <Route path="projects/new" element={<AdminProjectForm />} />
                  <Route path="projects/:id/edit" element={<AdminProjectForm />} />
                  <Route path="services" element={<AdminServices />} />
                  <Route path="messages" element={<AdminMessages />} />
                  <Route path="users" element={<AdminUsers />} />
                  <Route path="documents" element={<AdminDocuments />} />
                  <Route path="support" element={<AdminSupport />} />
                  <Route path="careers" element={<AdminCareers />} />
                  <Route path="locations" element={<AdminLocations />} />
                  <Route path="manage-content" element={<AdminManageContent />} />
                  <Route path="manage-stats" element={<AdminManageStats />} />
                  <Route path="manage-documents" element={<AdminManageDocuments />} />
                  <Route path="manage-support" element={<AdminManageSupport />} />
                  <Route path="manage-careers" element={<AdminManageCareers />} />
                </Route>
                
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
