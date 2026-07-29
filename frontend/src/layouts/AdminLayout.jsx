import AdminNavbar from "../components/AdminNavbar";
import AdminSidebar from "../components/AdminSidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-slate-100">

      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">

        {/* Sticky Navbar */}
        <div className="sticky top-0 z-30">
          <AdminNavbar />
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-slate-100 p-8">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>

      </div>

    </div>
  );
};

export default AdminLayout;