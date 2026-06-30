import FeaturedArticles from "../components/news/FeaturedArticles";
import SecondaryStories from "../components/news/SecondaryStories";
import LatestNews from "../features/articles/components/LatestNews";
import Sidebar from "../components/news/Sidebar";
import BreakingNews from "../components/common/BreakingNews";
import Newsletter from "../components/common/Newsletter";

export default function Home() {
  return (
    <>
      {/* 🔴 BREAKING NEWS */}
      <BreakingNews />

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-10">
        <section className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            Today’s Top Stories
          </h1>

          <p className="text-gray-600 dark:text-gray-400">
            Latest news from Nepal and around the world.
          </p>
        </section>

        {/* FEATURED */}
        <section>
          <FeaturedArticles />
        </section>

        {/* SECONDARY STORIES */}
        <section>
          <SecondaryStories />
        </section>

        {/* MAIN GRID */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold border-b border-gray-200 dark:border-gray-700 pb-2 text-gray-900 dark:text-white">
              Latest News
            </h2>

            <LatestNews />
          </div>

          <Sidebar />
        </section>

        {/* NEWSLETTER */}
        <section>
          <Newsletter />
        </section>
      </main>
    </>
  );
}
