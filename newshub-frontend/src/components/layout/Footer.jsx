import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 mt-16 py-10 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* BRAND */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            <span className="text-red-600">News</span>Hub
          </h2>

          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Modern news portal delivering fast and reliable updates.
          </p>
        </div>

        {/* LINKS */}
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
            Quick Links
          </h3>

          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li>
              <Link to="/" className="hover:text-red-600 transition">
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/category/news"
                className="hover:text-red-600 transition"
              >
                News
              </Link>
            </li>

            <li>
              <Link
                to="/category/sports"
                className="hover:text-red-600 transition"
              >
                Sports
              </Link>
            </li>

            <li>
              <Link
                to="/category/business"
                className="hover:text-red-600 transition"
              >
                Business
              </Link>
            </li>

            <li>
              <Link
                to="/category/tech"
                className="hover:text-red-600 transition"
              >
                Technology
              </Link>
            </li>

            <li>
              <Link
                to="/category/opinion"
                className="hover:text-red-600 transition"
              >
                Opinion
              </Link>
            </li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
            Support
          </h3>

          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li>
              <Link to="/about" className="hover:text-red-600 transition">
                About Us
              </Link>
            </li>

            <li>
              <Link to="/contact" className="hover:text-red-600 transition">
                Contact
              </Link>
            </li>

            <li>
              <Link to="/privacy" className="hover:text-red-600 transition">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="text-center text-xs text-gray-500 dark:text-gray-400 mt-10">
        © {new Date().getFullYear()} NewsHub. All rights reserved.
      </div>
    </footer>
  );
}
