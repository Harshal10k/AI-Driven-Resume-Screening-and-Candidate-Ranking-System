import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const MainLayout = ({
  children,
  showSidebar = true,
}) => {
  return (
    <div className="h-screen bg-slate-100">

      <Navbar />

      <div className="flex h-[calc(100vh-56px)]">

        {showSidebar && <Sidebar />}

        <main className="flex-1 h-[calc(100vh-56px)] overflow-hidden">
          {children}
        </main>

      </div>

    </div>
  );
};

export default MainLayout;