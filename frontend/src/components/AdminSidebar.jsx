import { NavLink } from "react-router-dom";

const AdminSidebar = () => {

  return (
    <div className="w-64 bg-white border-r">

      <div className="p-5">

        <NavLink
          to="/admin"
          className="block p-3 rounded-lg hover:bg-slate-100"
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/hrs"
          className="block p-3 rounded-lg hover:bg-slate-100"
        >
          HR Management
        </NavLink>

        <NavLink
          to="/admin/candidates"
          className="block p-3 rounded-lg hover:bg-slate-100"
        >
          Candidates
        </NavLink>

        <NavLink
          to="/admin/settings"
          className="block p-3 rounded-lg hover:bg-slate-100"
        >
          Settings
        </NavLink>

      </div>

    </div>
  );
};

export default AdminSidebar;