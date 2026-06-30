import { useState } from "react";
import EditorSidebar from "../components/EditorSidebar";
import EditorDashboardContent from "../components/EditorDashboardContent";
import EditorArticles from "../components/EditorArticles";

export default function EditorDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="flex min-h-screen">
      <EditorSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 p-6">
        {activeTab === "dashboard" && <EditorDashboardContent />}
        {activeTab === "articles" && <EditorArticles />}
      </div>
    </div>
  );
}
