import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const MainLayout = ({ children }) => {
  return (
    <div className="h-screen bg-slate-100">

      <Navbar />

      <div className="flex h-[calc(100vh-56px)]">

        <Sidebar />

        <main className="flex-1 overflow-auto p-8">
          {children}
        </main>

      </div>
    </div>
  );
};

export default MainLayout;