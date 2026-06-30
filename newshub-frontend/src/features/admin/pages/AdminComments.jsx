import {
  useAdminComments,
  useUpdateCommentStatus,
  useDeleteComment,
} from "../hooks/useAdminComments";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

export default function AdminComments() {
  const { data, isLoading } = useAdminComments();
  console.log("ADMIN COMMENTS DATA:", data);
  const comments = Array.isArray(data) ? data : [];
  const updateStatus = useUpdateCommentStatus();
  const deleteComment = useDeleteComment();
  const [filter, setFilter] = useState("all");

  const handleToggle = (id, currentStatus) => {
    const newStatus = currentStatus === "visible" ? "hidden" : "visible";

    updateStatus.mutate(
      { id, status: newStatus },
      {
        onSuccess: () => toast.success("Status updated"),
      },
    );
  };

  const handleDelete = (id) => {
    deleteComment.mutate(id, {
      onSuccess: () => toast.success("Comment deleted"),
    });
  };

  const filteredComments = comments.filter((c) => {
    if (filter === "all") return true;
    return c.status === filter;
  });

  return (
    <div className="p-4 max-w-7xl mx-auto text-gray-900 dark:text-white">
      <ToastContainer />

      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Comments Management
      </h1>
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1 rounded border transition ${
            filter === "all"
              ? "bg-red-600 text-white border-red-600"
              : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
        >
          All
        </button>

        <button
          onClick={() => setFilter("visible")}
          className={`px-3 py-1 rounded border transition ${
            filter === "visible"
              ? "bg-green-600 text-white border-green-600"
              : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
        >
          Visible
        </button>

        <button
          onClick={() => setFilter("hidden")}
          className={`px-3 py-1 rounded border transition ${
            filter === "hidden"
              ? "bg-red-600 text-white border-red-600"
              : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
        >
          Hidden
        </button>
      </div>

      {isLoading ? (
        <p className="text-center py-10 text-gray-500 dark:text-gray-400">
          Loading comments...
        </p>
      ) : (
        <div className="space-y-3">
          {filteredComments?.map((c) => (
            <div
              key={c.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md border border-gray-200 dark:border-gray-700 p-4 flex justify-between items-start gap-4 transition"
            >
              <div className="flex gap-4 flex-1">
                {c.articles?.image && (
                  <img
                    src={c.articles.image}
                    alt="article"
                    className="w-20 h-20 rounded-lg object-cover border border-gray-200 dark:border-gray-700 flex-shrink-0"
                  />
                )}

                <div className="flex-1">
                  <Link
                    to={`/article/${c.article_id}`}
                    className="block text-sm font-semibold text-blue-600 hover:underline"
                  >
                    📰 {c.articles?.title}
                  </Link>

                  <h3 className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                    👤 {c.name}
                  </h3>

                  <p className="mt-2 text-sm text-gray-700 dark:text-gray-300 italic">
                    "{c.comment}"
                  </p>

                  <p className="text-xs text-gray-500  dark:text-gray-400 mt-2">
                    {new Date(c.created_at).toLocaleString()}
                  </p>

                  <span
                    className={`inline-block mt-2 px-2 py-1 text-xs rounded-full font-medium ${
                      c.status === "visible"
                        ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                        : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
                    }`}
                  >
                    {c.status}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2 self-start">
                <button
                  onClick={() => handleToggle(c.id, c.status)}
                  className={`w-20 py-1.5 text-xs rounded-md text-white transition ${
                    c.status === "visible"
                      ? "bg-yellow-500 hover:bg-yellow-600"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {c.status === "visible" ? "Hide" : "Show"}
                </button>

                <button
                  onClick={() => {
                    if (
                      confirm("Are you sure you want to delete this comment?")
                    ) {
                      handleDelete(c.id);
                    }
                  }}
                  className="w-20 py-1.5 text-xs rounded-md bg-red-500 hover:bg-red-600 text-white transition duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
