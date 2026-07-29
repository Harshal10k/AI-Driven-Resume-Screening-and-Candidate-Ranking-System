import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  Users,
  Settings,
  ChevronRight,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    path: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Employer Management",
    path: "/admin/employers",
    icon: Building2,
  },
  {
    title: "Candidate Management",
    path: "/admin/candidates",
    icon: Users,
  },
  {
    title: "Settings",
    path: "/admin/settings",
    icon: Settings,
  },
];

const AdminSidebar = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <aside className="flex h-full w-64 flex-col border-r border-slate-200 bg-white">

      {/* Navigation */}

      <div className="flex-1 px-4 py-6">

        <p className="mb-5 px-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
          Navigation
        </p>

        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/admin"}
                className={({ isActive }) =>
                  `group flex items-center justify-between rounded-xl px-4 py-3 transition-all duration-200 ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-md"
                      : "text-slate-600 hover:bg-slate-100 hover:text-indigo-600"
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon size={20} />
                  <span className="font-medium">{item.title}</span>
                </div>

                <ChevronRight
                  size={16}
                  className="opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100"
                />
              </NavLink>
            );
          })}
        </div>

      </div>

      {/* Footer */}

      {/* Footer */}

      <div className="border-t border-slate-200 p-4">

        <div className="rounded-xl bg-slate-100 px-4 py-3 text-center">

          <div className="flex items-center justify-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
            <span className="text-sm font-medium text-slate-700">
              System Online
            </span>
          </div>

          <p className="mt-2 text-xs text-slate-500">
            HireMind AI • Version 1.0
          </p>

        </div>

      </div>
      
    </aside>
  );
};

export default AdminSidebar;