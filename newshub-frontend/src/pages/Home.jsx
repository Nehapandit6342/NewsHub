import FeaturedArticles from "../components/news/FeaturedArticles";
import SecondaryStories from "../components/news/SecondaryStories";
import LatestNews from "../features/articles/components/LatestNews";
import Sidebar from "../components/news/Sidebar";

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-8 space-y-12">
      {/* ================= HERO SECTION ================= */}
      <section className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">
          Today’s Top Stories
        </h1>
        <p className="text-black/60">
          Latest news from Nepal and around the world.
        </p>
      </section>

      {/* ================= FEATURED ================= */}
      <section>
        <FeaturedArticles />
      </section>

      {/* ================= SECONDARY STORIES ================= */}
      <section>
        <SecondaryStories />
      </section>

      {/* ================= MAIN GRID ================= */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* LEFT SIDE - LATEST NEWS */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold border-b pb-2">Latest News</h2>

          <LatestNews />
        </div>

        {/* RIGHT SIDE - SIDEBAR */}
        <Sidebar />
      </section>
    </main>
  );
}
