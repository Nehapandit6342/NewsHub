import { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import { useAdminStats } from "../hooks/useAdminStats";
import { useAdminDashboard } from "../hooks/useAdminDashboard";

export default function AdminDashboard() {
  // ARTICLES (for charts)
  const { data, isLoading, error } = useAdminDashboard();
  console.log("ADMIN DASHBOARD RAW:", data);

  const articles = data?.data || [];

  // STATS (NEW - CLEAN WAY)
  const { data: statsData, isLoading: statsLoading } = useAdminStats();
  const stats = statsData || {};
  console.log("STATS DATA:", statsData);
  console.log("STATS RAW:", statsData);
  console.log("STATS FINAL:", stats);

  const [timeFilter, setTimeFilter] = useState("all");

  // FILTER ARTICLES
  const filteredArticles = useMemo(() => {
    if (!Array.isArray(articles)) return [];

    const now = new Date();

    return articles.filter((a) => {
      if (!a.created_at) return false;

      const diff = (now - new Date(a.created_at)) / (1000 * 60 * 60 * 24);

      if (timeFilter === "7days") return diff <= 7;
      if (timeFilter === "30days") return diff <= 30;

      return true;
    });
  }, [articles, timeFilter]);

  // CATEGORY
  const categoryData = useMemo(() => {
    const categoryCount = filteredArticles.reduce((acc, item) => {
      const cat = (item.category || "unknown").toLowerCase();
      acc[cat] = (acc[cat] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(categoryCount).map(([name, value]) => ({
      name,
      value,
    }));
  }, [filteredArticles]);

  // TRENDING
  const topTrending = useMemo(() => {
    return [...filteredArticles]
      .filter((a) => a.status === "published")
      .sort((a, b) => (b.views || 0) - (a.views || 0))
      .slice(0, 5);
  }, [filteredArticles]);

  // LINE DATA
  const lineData = useMemo(() => {
    return filteredArticles.map((a) => ({
      name: a.title?.length > 15 ? a.title.slice(0, 15) + "..." : a.title,
      views: a.views || 0,
    }));
  }, [filteredArticles]);

  if (isLoading || statsLoading) return;
  <p className="text-gray-600 dark:text-gray-400">Loading dashboard...</p>;
  if (error) return <p>Failed to load dashboard</p>;
  // pie data
  const publishedCount = filteredArticles.filter(
    (a) => a.status === "published",
  ).length;

  const draftCount = filteredArticles.filter(
    (a) => a.status === "draft",
  ).length;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        📊 Admin Insights
      </h1>

      {/* FILTER */}
      <div className="flex gap-3">
        {["all", "7days", "30days"].map((f) => (
          <button
            key={f}
            onClick={() => setTimeFilter(f)}
            className={`px-3 py-1 rounded border transition ${
              timeFilter === f
                ? "bg-red-600 text-white border-red-600"
                : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* STATS (NOW USING useAdminStats) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-100 dark:bg-gray-800 p-5 rounded-lg shadow border border-blue-200 dark:border-gray-700">
          <h2 className="text-blue-800 dark:text-gray-400">Total Views</h2>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {stats.totalViews || 0}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <h2 className="text-gray-600 dark:text-gray-400">Total Articles</h2>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {stats.totalArticles || 0}
          </p>
        </div>

        <div className="bg-green-100 dark:bg-gray-800 p-5 rounded-lg shadow border border-green-200 dark:border-gray-700">
          <h2 className="text-green-800 dark:text-gray-400">Comments</h2>
          <p className="text-2xl font-bold text-green-900 dark:text-white">
            {stats.totalComments || 0}
          </p>
        </div>

        <div className="bg-yellow-100 dark:bg-gray-800 p-5 rounded-lg shadow border border-yellow-200 dark:border-gray-700">
          <h2 className="text-yellow-800 dark:text-gray-400">
            Published / Draft
          </h2>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {/* fallback calculation if backend doesn't send it */}
            {
              filteredArticles.filter((a) => a.status === "published").length
            } / {filteredArticles.filter((a) => a.status === "draft").length}
          </p>
        </div>
      </div>
      {/* LINE CHART */}
      <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <h2 className="font-semibold mb-3 text-gray-900 dark:text-white">
          📈 Views Per Article
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="views" stroke="#3b82f6" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* PIE */}
      <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <h2 className="font-semibold mb-3 text-gray-900 dark:text-white">
          🥧 Content Status
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={[
                { name: "Published", value: publishedCount },
                { name: "Draft", value: draftCount },
              ]}
              dataKey="value"
              outerRadius={100}
              label
            >
              <Cell fill="#22c55e" />
              <Cell fill="#facc15" />
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* CATEGORY */}
      <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <h2 className="font-semibold mb-3 text-gray-900 dark:text-white">
          📊 Category Distribution
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={categoryData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#6366f1" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* TOP TRENDING */}
      <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
          🔥 Top Trending
        </h2>

        {topTrending.map((item) => (
          <div
            key={item.id}
            className="flex justify-between border-b border-gray-200 dark:border-gray-700 py-2"
          >
            <span className="text-sm text-gray-900 dark:text-white">
              {item.title}
            </span>
            <span className="text-blue-600 font-bold">
              {item.views || 0} views
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
