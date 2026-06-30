import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";

import { useDebounce } from "../../hooks/useDebounce";
import { useSearchArticles } from "../../features/articles/hooks/useSearchArticles";
import ThemeToggle from "../ThemeToggle";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  // 🔥 debounce input
  const debouncedSearch = useDebounce(search, 500);

  // 🔥 react query search
  const { data: suggestions = [], isLoading } =
    useSearchArticles(debouncedSearch);
  const categories = [
    { name: "News", slug: "news" },
    { name: "Sports", slug: "sports" },
    { name: "Business", slug: "business" },
    { name: "Tech", slug: "tech" },
    { name: "Opinion", slug: "opinion" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        {/* TOP */}
        <div className="flex justify-between items-center py-4">
          {/* LOGO */}
          <Link
            to="/"
            className="text-2xl font-bold text-gray-900 dark:text-white"
          >
            <span className="text-red-600">News</span>Hub
          </Link>

          {/* SEARCH */}
          <div className="flex items-center gap-3">
            <div className="relative">
              {/* Mobile Search Icon */}
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="md:hidden p-2"
              >
                <FiSearch size={20} />
              </button>

              {/* Desktop Search */}
              <div className="hidden md:block relative">
                <FiSearch className="absolute left-3 top-3 text-gray-400" />

                <input
                  className="pl-10 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 rounded-lg w-64 text-sm"
                  type="text"
                  placeholder="Search news..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              {/* Mobile Search Input */}
              {showSearch && (
                <div className="absolute right-0 top-12 w-72 bg-white border rounded-lg shadow-lg p-2 md:hidden">
                  <input
                    className="w-full border px-3 py-2 rounded-lg text-sm"
                    type="text"
                    placeholder="Search news..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    autoFocus
                  />
                </div>
              )}

              {/* DROPDOWN */}
              {debouncedSearch && (
                <div className="absolute top-full right-0 md:left-0 w-72 md:w-full bg-white border shadow-lg z-50 max-h-80 overflow-y-auto">
                  {isLoading ? (
                    <p className="p-3 text-sm text-gray-500">Searching...</p>
                  ) : suggestions.length > 0 ? (
                    suggestions.map((article) => (
                      <Link
                        key={article.id}
                        to={`/article/${article.id}`}
                        className="block p-3 hover:bg-gray-100"
                        onClick={() => {
                          setSearch("");
                          setShowSearch(false);
                        }}
                      >
                        <p className="text-xs text-gray-500">
                          {article.category}
                        </p>
                        <p className="text-sm font-medium">{article.title}</p>
                      </Link>
                    ))
                  ) : (
                    <p className="p-3 text-sm text-gray-500">
                      No results found
                    </p>
                  )}
                </div>
              )}
            </div>

            <ThemeToggle />
          </div>
          {/* LOGIN */}
        </div>

        {/* NAVIGATION */}
        <nav className="flex gap-6 text-sm py-3 border-t overflow-x-auto whitespace-nowrap scrollbar-hide">
          <NavLink
            to="/"
            className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white font-medium"
          >
            Home
          </NavLink>
          {categories.map((cat) => (
            <NavLink
              key={cat.slug}
              to={`/category/${cat.slug}`}
              className={({ isActive }) =>
                `text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white font-medium ${
                  isActive
                    ? "text-red-600 font-bold border-b-2 border-red-600 pb-1"
                    : ""
                }`
              }
            >
              {cat.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
