import { Link } from "react-router-dom";
import { useFeaturedArticles } from "../../features/articles/hooks/useFeaturedArticles";
import ArticleMeta from "./ArticleMeta";

export default function FeaturedArticles() {
  const { data = [], isLoading, isError } = useFeaturedArticles();

  if (isLoading)
    return <p className="text-gray-500">Loading featured news...</p>;

  if (isError)
    return <p className="text-red-500">Failed to load featured news</p>;

  const featured = data?.[0];
  if (!featured) return null;

  return (
    <section className="mb-8">
      <Link
        to={`/article/${featured.id}`}
        className="block rounded-xl overflow-hidden border hover:shadow-md transition"
      >
        {/* IMAGE (BIGGER FEATURED STYLE) */}
        <div className="w-full h-[320px] md:h-[380px] overflow-hidden">
          <img
            src={featured.image || "/placeholder.jpg"}
            alt={featured.title}
            className="w-full h-full object-cover hover:scale-105 transition duration-300"
          />
        </div>

        {/* CONTENT */}
        <div className="p-5 space-y-3">
          {/* META */}
          <ArticleMeta article={featured} />

          {/* TITLE */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug">
            {featured.title}
          </h2>

          {/* DESCRIPTION */}
          <p className="text-gray-600 text-base line-clamp-3">
            {featured.short_description}
          </p>

          {/* CTA */}
          <span className="inline-block text-sm font-medium text-black hover:underline">
            Read full story →
          </span>
        </div>
      </Link>
    </section>
  );
}
