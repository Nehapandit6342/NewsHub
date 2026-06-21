import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { getRole } from "@/utils/token";

export default function AdminLayout() {
  const role = getRole();
  const navigate = useNavigate();

  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-md text-sm font-medium transition ${
      isActive ? "bg-black text-white" : "text-gray-600 hover:bg-gray-200"
    }`;

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r flex flex-col justify-between">
        <div>
          <div className="p-6 border-b">
            <h1 className="text-lg font-semibold">NewsHub CMS</h1>

            <p className="text-xs text-gray-500 mt-1 capitalize">{role}</p>
          </div>

          <nav className="p-3 flex flex-col gap-1">
            {role === "admin" && (
              <NavLink to="/admin/dashboard" className={linkClass}>
                Dashboard
              </NavLink>
            )}

            <NavLink to="/admin/articles" className={linkClass}>
              Articles
            </NavLink>

            {role === "admin" && (
              <>
                <NavLink to="/admin/editors" className={linkClass}>
                  Editors
                </NavLink>

                <NavLink to="/admin/comments" className={linkClass}>
                  Comments
                </NavLink>
              </>
            )}
          </nav>
        </div>

        <div className="p-4 border-t">
          <button
            onClick={logout}
            className="w-full text-red-500 hover:text-red-600 text-sm"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}
