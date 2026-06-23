import AdminNavbar from "../components/AdminNavbar";
import AdminSidebar from "../components/AdminSidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="h-screen flex flex-col">

      <AdminNavbar />

      <div className="flex flex-1 overflow-hidden">

        <AdminSidebar />

        <main className="flex-1 p-8 overflow-y-auto bg-slate-100">
          {children}
        </main>

      </div>

    </div>
  );
};

export default AdminLayout;