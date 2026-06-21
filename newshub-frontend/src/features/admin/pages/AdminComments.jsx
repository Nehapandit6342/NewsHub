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
    <div className="p-4">
      <ToastContainer />

      <h1 className="text-2xl font-bold mb-6">Comments Management</h1>
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setFilter("all")}
          className="px-3 py-1 border rounded"
        >
          All
        </button>

        <button
          onClick={() => setFilter("visible")}
          className="px-3 py-1 border rounded text-green-600"
        >
          Visible
        </button>

        <button
          onClick={() => setFilter("hidden")}
          className="px-3 py-1 border rounded text-red-600"
        >
          Hidden
        </button>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-3">
          {filteredComments?.map((c) => (
            <div
              key={c.id}
              className="bg-white p-4 rounded-xl shadow-sm border flex justify-between gap-4"
            >
              <div>
                {c.article_image && (
                  <img
                    src={c.article_image}
                    alt="article"
                    className="w-12 h-12 object-cover rounded mb-2"
                  />
                )}
                <Link
                  to={`/article/${c.article_id}`}
                  className=" block text-xs text-blue-600 font-medium mb-1 hover:underline"
                >
                  📰 {c.article_title}
                </Link>

                <h3 className="font-bold">{c.name}</h3>

                <p className="text-gray-600 mt-1">{c.comment}</p>

                <p className="text-xs text-gray-500 mt-2">
                  {new Date(c.created_at).toLocaleString()}
                </p>

                <p
                  className={`text-sm mt-1 ${
                    c.status === "visible" ? "text-green-600" : "text-red-500"
                  }`}
                >
                  Status: {c.status}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleToggle(c.id, c.status)}
                  className={`px-3 py-1 rounded text-white ${
                    c.status === "visible" ? "bg-yellow-500" : "bg-green-600"
                  }`}
                >
                  {c.status === "visible" ? "Hide" : "Show"}
                </button>

                <button
                  onClick={() => handleDelete(c.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
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
