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
    <div className="mt-12 border-t pt-6">
      <h2 className="text-xl font-bold mb-4">💬 Comments</h2>

      {/* FORM */}
      <div className="space-y-3 mb-6">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="w-full border p-2 rounded"
        />

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a comment..."
          className="w-full border p-2 rounded"
          rows="3"
        />

        <button
          onClick={submitComment}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Post Comment
        </button>
      </div>

      {/* LIST */}
      <div className="space-y-4">
        {comments.map((c) => (
          <div key={c.id} className="border-b pb-3">
            <p className="font-semibold">{c.name}</p>
            <p className="text-gray-600">{c.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
