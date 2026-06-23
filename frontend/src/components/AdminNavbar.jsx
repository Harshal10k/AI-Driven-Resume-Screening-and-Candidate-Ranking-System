const AdminNavbar = () => {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <div className="h-16 bg-slate-900 flex items-center justify-between px-8">

      <div className="flex items-center gap-3">

        <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
          AI
        </div>

        <h1 className="text-white text-xl font-semibold">
          CVAnalyzer Admin
        </h1>

      </div>

      <div className="flex items-center gap-3">

        <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white">

          {user?.name?.charAt(0)}

        </div>

        <span className="text-white">
          {user?.name}
        </span>

      </div>

    </div>
  );
};

export default AdminNavbar;