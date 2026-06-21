import { Link } from "react-router-dom";
import { useMemo } from "react";

import { useTrendingArticles } from "../../features/articles/hooks/useTrendingArticles";
import { useAllArticles } from "../../features/articles/hooks/useAllArticles";

export default function Sidebar() {
  // 🔥 React Query data
  const { data: trending = [], isLoading: trendingLoading } =
    useTrendingArticles();

  const { data: allArticles = [], isLoading: allLoading } = useAllArticles();

  // 🧠 Derive categories + preview map
  const { categories, categoryPreviewMap } = useMemo(() => {
    const catSet = new Set();
    const map = {};
    const safeArticles = Array.isArray(allArticles) ? allArticles : [];

    safeArticles.forEach((item) => {
      if (!item?.category) return;

      catSet.add(item.category);

      if (!map[item.category]) {
        map[item.category] = item; // first article per category
      }
    });

    return {
      categories: [...catSet],
      categoryPreviewMap: map,
    };
  }, [allArticles]);

  return (
    <aside className="space-y-10">
      {/* ================= TRENDING ================= */}
      <div>
        <h2 className="text-lg font-bold border-b pb-2">🔥 Trending</h2>

        {trendingLoading ? (
          <p className="text-sm text-gray-500 mt-3">Loading...</p>
        ) : (
          <ul className="space-y-3 mt-3">
            {trending.slice(0, 5).map((item) => (
              <li key={item.id}>
                <Link
                  to={`/article/${item.id}`}
                  className="flex gap-3 p-2 rounded hover:bg-gray-100 transition"
                >
                  {/* IMAGE */}
                  <img
                    src={item.image || "/placeholder.jpg"}
                    alt={item.title}
                    className="w-14 h-14 object-cover rounded"
                  />

                  {/* TEXT */}
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold leading-tight line-clamp-2">
                      {item.title}
                    </h3>

                    {/* ONLY CATEGORY (clean like news sites) */}
                    <p className="text-xs text-gray-500 mt-1 uppercase">
                      {item.category}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* ================= CATEGORIES ================= */}
      <div>
        <h2 className="text-sm font-bold uppercase border-b pb-1 mb-3">
          Categories
        </h2>

        {allLoading ? (
          <p className="text-sm text-gray-500">Loading...</p>
        ) : (
          <ul className="space-y-3">
            {categories.slice(0, 2).map((cat, index) => {
              const sample = categoryPreviewMap[cat];

              return (
                <li key={index}>
                  <Link
                    to={`/category/${encodeURIComponent(cat.toLowerCase())}`}
                    className="flex gap-3 p-2 rounded hover:bg-gray-100 transition"
                  >
                    <img
                      src={sample?.image || "/placeholder.jpg"}
                      alt={cat}
                      className="w-12 h-12 object-cover rounded"
                    />

                    <div>
                      <h3 className="text-sm font-semibold">{cat}</h3>

                      <p className="text-xs text-gray-500 line-clamp-2">
                        {sample?.short_description ||
                          "Latest news in this category"}
                      </p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* ================= OPINION ================= */}
      <div>
        <h2 className="text-sm font-bold uppercase border-b pb-1 mb-3">
          Opinion
        </h2>

        <ul className="space-y-3">
          {trending.slice(0, 2).map((item) => (
            <li key={item.id}>
              <Link
                to={`/article/${item.id}`}
                className="flex gap-3 p-2 rounded hover:bg-gray-100 transition"
              >
                <img
                  src={item.image || "/placeholder.jpg"}
                  alt={item.title}
                  className="w-12 h-12 object-cover rounded"
                />

                <div>
                  <h3 className="text-sm font-semibold line-clamp-1">
                    {item.title}
                  </h3>

                  <p className="text-xs text-gray-500 line-clamp-2">
                    {item.short_description}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
