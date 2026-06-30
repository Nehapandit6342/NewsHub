import { Link } from "react-router-dom";
import { useBreakingNews } from "../../features/articles/hooks/useBreakingNews";

export default function BreakingNews() {
  const { data, isLoading, error } = useBreakingNews();

  if (isLoading) {
    return (
      <div className="bg-gray-600 text-white text-sm py-2 px-4">
        breaking news is loading....📰
      </div>
    );
  }

  if (error || !data?.length) {
    return null;
  }

  return (
    <div className="bg-gray-600 text-white text-sm overflow-hidden">
      <div className="flex items-center">
        {/* FIXED LABEL */}
        <div className="bg-black px-4 py-2 font-bold z-10">🔴 Breaking</div>

        {/* MOVING NEWS */}
        <div className="overflow-hidden flex-1">
          <div className="flex whitespace-nowrap animate-marquee hover:[animation-play-state:paused] py-2">
            {data.map((item) => (
              <Link
                key={item.id}
                to={`/article/${item.id}`}
                className="mx-8 hover:underline"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
