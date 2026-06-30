import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { getRole } from "@/utils/token";
import ThemeToggle from "../../../components/ThemeToggle";

export default function AdminLayout() {
  const role = getRole();
  const navigate = useNavigate();

  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-md text-sm font-medium transition ${
      isActive
        ? "bg-red-600 text-white"
        : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
    }`;

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 flex flex-col justify-between">
        <div>
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                  NewsHub CMS
                </h1>

                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 capitalize">
                  {role}
                </p>
              </div>

              <ThemeToggle />
            </div>
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

        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <button
            onClick={logout}
            className="w-full text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400 text-sm transition"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
        <Outlet />
      </main>
    </div>
  );
}
