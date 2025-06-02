import { SidebarProvider } from "@meet/components/ui/sidebar";
import DashboardNavbar from "@meet/modules/dashboard/ui/components/dashboard-navbar";
import DashboardSidebar from "@meet/modules/dashboard/ui/components/dashboard-siderbar";

const Layout = ({ children } : { children: React.ReactNode }) => (
  <SidebarProvider>
    <DashboardSidebar />
    <main className="flex flex-col h-screen w-screen bg-muted">
      <DashboardNavbar />
      {children}
    </main>
  </SidebarProvider>
);
 
export default Layout;
