import { useState } from "react";
import { useComments } from "../../articles/hooks/useComments";
import { useAddComment } from "../../articles/hooks/useAddComment";

export default function CommentSection({ articleId }) {
  const { data: comments = [] } = useComments(articleId);
  const { mutate: addComment } = useAddComment();

  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  const submitComment = () => {
    if (!name || !comment) return;

    addComment({
      article_id: articleId,
      name,
      comment,
    });

    setName("");
    setComment("");
  };

  return (
    <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-6">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
        💬 Comments
      </h2>

      {/* FORM */}
      <div className="space-y-3 mb-6">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a comment..."
          rows="3"
          className="w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        <button
          onClick={submitComment}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
        >
          Post Comment
        </button>
      </div>

      {/* LIST */}
      <div className="space-y-4">
        {comments.map((c) => (
          <div
            key={c.id}
            className="border-b border-gray-200 dark:border-gray-700 pb-3"
          >
            <p className="font-semibold text-gray-900 dark:text-white">
              {c.name}
            </p>

            <p className="text-gray-600 dark:text-gray-400">{c.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
