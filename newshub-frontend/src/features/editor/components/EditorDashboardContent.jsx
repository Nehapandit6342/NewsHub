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

import { useEditorArticles } from "../hooks/useEditorArticles";

export default function EditorDashboard() {
  // ARTICLES (for charts)
  const { data, isLoading, error } = useEditorArticles();

  const articles = data || [];

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

  if (isLoading) return <p>Loading dashboard...</p>;
  if (error) return <p>Failed to load dashboard</p>;
  // pie data
  const publishedCount = filteredArticles.filter(
    (a) => a.status === "published",
  ).length;

  const draftCount = filteredArticles.filter(
    (a) => a.status === "draft",
  ).length;

  const totalViews = filteredArticles.reduce(
    (sum, article) => sum + (article.views || 0),
    0,
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">📊 Editor Dashboard</h1>
      {/* FILTER */}
      <div className="flex gap-3">
        {["all", "7days", "30days"].map((f) => (
          <button
            key={f}
            onClick={() => setTimeFilter(f)}
            className={`border px-3 py-1 ${
              timeFilter === f ? "bg-black text-white" : ""
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Editor Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded shadow">
          <h2>Total Articles</h2>
          <p className="text-2xl font-bold">{articles.length}</p>
        </div>

        <div className="bg-green-100 p-5 rounded shadow">
          <h2>Published Articles</h2>
          <p className="text-2xl font-bold">{publishedCount}</p>
        </div>

        <div className="bg-yellow-100 p-5 rounded shadow">
          <h2>Draft Articles</h2>
          <p className="text-2xl font-bold">{draftCount}</p>
        </div>

        <div className="bg-blue-100 p-5 rounded shadow">
          <h2>Total Views</h2>
          <p className="text-2xl font-bold">{totalViews}</p>
        </div>
      </div>
      {/* LINE CHART */}
      <div className="bg-white p-5 rounded shadow">
        <h2 className="font-semibold mb-3">📈 Views Per Article</h2>

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
      <div className="bg-white p-5 rounded shadow">
        <h2 className="font-semibold mb-3">🥧 Content Status</h2>

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
      <div className="bg-white p-5 rounded shadow">
        <h2 className="font-semibold mb-3">📊 Category Distribution</h2>

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
      <div className="bg-white p-5 rounded shadow">
        <h2 className="text-lg font-semibold mb-3">🔥 Top Trending</h2>

        {topTrending.map((item) => (
          <div key={item.id} className="flex justify-between border-b py-2">
            <span className="text-sm">{item.title}</span>
            <span className="text-blue-600 font-bold">
              {item.views || 0} views
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
