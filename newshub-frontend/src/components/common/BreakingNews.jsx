import { Link } from "react-router-dom";
import { useBreakingNews } from "../../features/articles/hooks/useBreakingNews";

export default function BreakingNews() {
  const { data, isLoading, error } = useBreakingNews();

  if (isLoading) {
    return (
      <div className="bg-gray-600 text-white text-sm py-2 px-4">
        Loading breaking news...
      </div>
    );
  }

  if (error) {
    return null;
  }

  return (
    <div className="bg-gray-600 text-white text-sm overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee py-2">
        {data?.map((item) => (
          <Link
            key={item.id}
            to={`/article/${item.id}`}
            className="mx-8 hover:underline"
          >
            🔴 {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
