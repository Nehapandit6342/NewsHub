export default function EditorSidebar({ activeTab, setActiveTab }) {
  return (
    <div className="w-64 bg-white text-black p-5 min-h-screen">
      <h2 className="text-xl font-bold mb-6">Editor Panel</h2>

      <button
        onClick={() => setActiveTab("dashboard")}
        className={`block w-full text-left px-3 py-2 rounded mb-2 ${
          activeTab === "dashboard"
            ? "bg-black text-white"
            : "hover:bg-gray-200"
        }`}
      >
        Dashboard
      </button>
      <button
        onClick={() => setActiveTab("articles")}
        className={`block w-full text-left px-3 py-2 rounded mb-2 ${
          activeTab === "articles" ? "bg-black text-white" : "hover:bg-gray-800"
        }`}
      >
        My Articles
      </button>
    </div>
  );
}
