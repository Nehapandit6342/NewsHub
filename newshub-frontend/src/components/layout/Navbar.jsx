import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";

import { useDebounce } from "../../hooks/useDebounce";
import { useSearchArticles } from "../../features/articles/hooks/useSearchArticles";

export default function Navbar() {
  const [search, setSearch] = useState("");

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
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="max-w-6xl mx-auto px-4">
        {/* TOP */}
        <div className="flex justify-between items-center py-4">
          {/* LOGO */}
          <Link to="/" className="text-2xl font-bold">
            <span className="text-red-600">News</span>Hub
          </Link>

          {/* SEARCH */}
          <div className="relative">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              className="pl-10 border px-3 py-2 rounded-lg w-64 text-sm"
              type="text"
              placeholder="Search news..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {/* DROPDOWN */}
            {debouncedSearch && (
              <div className="absolute top-full left-0 w-full bg-white border shadow-lg z-50">
                {isLoading ? (
                  <p className="p-3 text-sm text-gray-500">Searching...</p>
                ) : suggestions.length > 0 ? (
                  suggestions.map((article) => (
                    <Link
                      key={article.id}
                      to={`/article/${article.id}`}
                      className="block p-3 hover:bg-gray-100"
                      onClick={() => setSearch("")}
                    >
                      <p className="text-xs text-gray-500">
                        {article.category}
                      </p>
                      <p className="text-sm font-medium">{article.title}</p>
                    </Link>
                  ))
                ) : (
                  <p className="p-3 text-sm text-gray-500">No results found</p>
                )}
              </div>
            )}
          </div>

          {/* LOGIN */}
          <button className="bg-black text-white px-4 py-1 rounded">
            Login
          </button>
        </div>

        {/* NAVIGATION */}
        <nav className="flex gap-6 text-sm py-3 border-t">
          <NavLink
            to="/"
            className="text-black/70 hover:text-black font-medium"
          >
            Home
          </NavLink>
          {categories.map((cat) => (
            <NavLink
              key={cat.slug}
              to={`/category/${cat.slug}`}
              className={({ isActive }) =>
                `text-black/70 hover:text-black font-medium ${
                  isActive ? "text-black font-bold" : ""
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
