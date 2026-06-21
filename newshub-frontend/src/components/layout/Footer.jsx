import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="border-t mt-16 py-10 bg-white">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* BRAND */}
        <div>
          <h2 className="text-lg font-bold">KathmanduPost</h2>
          <p className="text-sm text-gray-600 mt-2">
            Modern news portal delivering fast and reliable updates.
          </p>
        </div>

        {/* LINKS */}
        <div>
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm text-gray-600">
            <li>Home</li>
            <li>News</li>
            <li>Sports</li>
            <li>Business</li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h3 className="font-semibold mb-2">Support</h3>
          <ul className="space-y-1 text-sm text-gray-600">
            <li>About Us</li>
            <li>Contact</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="text-center text-xs text-gray-500 mt-10">
        © {new Date().getFullYear()} KathmanduPost. All rights reserved.
      </div>
    </footer>
  );
}
