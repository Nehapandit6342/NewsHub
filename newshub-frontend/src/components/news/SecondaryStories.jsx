import { Link } from "react-router-dom";
import { useSecondaryNews } from "../../features/articles/hooks/useSecondaryNews";
import ArticleMeta from "./ArticleMeta";

export default function SecondaryStories() {
  const { data: stories = [], isLoading, isError } = useSecondaryNews();

  if (isLoading) {
    return (
      <section className="grid md:grid-cols-2 gap-6">
        <p className="text-gray-500">Loading secondary stories...</p>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="text-red-500">
        Failed to load secondary stories
      </section>
    );
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {stories.slice(0, 2).map((story) => (
        <Link
          key={story.id}
          to={`/article/${story.id}`}
          className="border rounded-lg overflow-hidden hover:shadow-lg transition block"
        >
          {/* IMAGE */}
          <img
            src={story.image}
            alt={story.title}
            className="h-44 w-full object-cover"
          />

          <div className="p-4 space-y-2">
            {/* META (NEW) */}
            <ArticleMeta article={story} />

            {/* TITLE */}
            <h2 className="font-bold text-lg leading-snug hover:text-black">
              {story.title}
            </h2>

            {/* DESCRIPTION */}
            <p className="text-sm text-gray-600 line-clamp-2">
              {story.short_description}
            </p>
          </div>
        </Link>
      ))}
    </section>
  );
}
