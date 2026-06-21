import ArticleCard from "../../../components/news/ArticleCard";
import { useAllArticles } from "../hooks/useAllArticles";

export default function LatestNews() {
  const { data, isLoading, isError } = useAllArticles();

  const articles = data || [];

  if (isLoading) {
    return (
      <section>
        <h2 className="text-2xl font-bold mb-4">Latest News</h2>
        <p className="text-gray-500">Loading...</p>
      </section>
    );
  }

  if (isError) {
    return (
      <section>
        <h2 className="text-2xl font-bold mb-4">Latest News</h2>
        <p className="text-red-500">Failed to load articles</p>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.slice(0, 4).map((item) => (
          <ArticleCard key={item.id} article={item} />
        ))}
      </div>
    </section>
  );
}
