import { useState } from "react";
import { getRole } from "@/utils/token";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { validateArticle } from "../../articles/validations/articleValidation";

import {
  useAdminArticles,
  useCreateArticle,
  useUpdateArticle,
  useDeleteArticle,
} from "../hooks/useAdminArticles";

export default function AdminArticles() {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState("all");
  const role = getRole();
  const { data, isLoading } = useAdminArticles();
  const createArticle = useCreateArticle();
  const updateArticle = useUpdateArticle();
  const deleteArticle = useDeleteArticle();

  const articles = data || [];

  // setform

  const [form, setForm] = useState({
    title: "",
    category: "",
    short_description: "",
    content: "",
    file: null,
    image: "",
    section: "latest",
    status: "draft",
    is_breaking: false,
  });

  // Reset form
  const resetForm = () => {
    setForm({
      title: "",
      category: "",
      short_description: "",
      content: "",
      file: null,
      image: "",
      section: "latest",
      status: "draft",
      is_breaking: false,
    });

    setShowForm(false);
    setEditingId(null);
  };

  // FILTER
  const filteredArticles =
    filter === "all" ? articles : articles.filter((a) => a.status === filter);

  // SUBMIT

  const handleSubmit = (status) => {
    const errors = validateArticle(form);

    if (Object.keys(errors).length > 0) {
      Object.values(errors).forEach((err) => toast.error(err));
      return;
    }
    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("category", form.category);
    formData.append("short_description", form.short_description);
    formData.append("content", form.content);
    formData.append("status", status);
    formData.append("section", form.section);
    formData.append("is_breaking", form.is_breaking);

    if (form.file) {
      formData.append("image", form.file);
    }
    // Update

    if (editingId) {
      updateArticle.mutate(
        { id: editingId, formData },
        {
          onSuccess: () => {
            toast.success("Article Updated successfully");
            resetForm();
          },
        },
      );
    }
    // CREATE
    else {
      createArticle.mutate(formData, {
        onSuccess: () => {
          toast.success("Article Created successfully");
          resetForm();
        },
      });
    }
  };

  // DELETE
  const handleDelete = (id) => {
    deleteArticle.mutate(id, {
      onSuccess: () => toast.success("Deleted"),
    });
  };
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  return (
    <div className="p-3 sm:p-4 md:p-6 max-w-7xl mx-auto">
      <ToastContainer />

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <h2 className="text-xl sm:text-2xl font-bold">Articles</h2>

        <button
          onClick={() => {
            setEditingId(null);
            setForm({
              title: "",
              category: "",
              short_description: "",
              content: "",
              file: null,
              image: "",
              section: "latest",
              status: "draft",
              is_breaking: false,
            });
            setShowForm(true);
          }}
          className="w-full sm:w-auto bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
        >
          + New Article
        </button>
      </div>

      {/* FILTER */}

      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        {["all", "draft", "published"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded-full text-sm border whitespace-nowrap flex-shrink-0 ${
              filter === f
                ? "bg-black text-white"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            {f}
          </button>
        ))}
      </div>
      {/* LIST */}
      {isLoading ? (
        <p>Loading...</p>
      ) : filteredArticles.length === 0 ? (
        <p className="text-center text-gray-500 py-10">No articles found</p>
      ) : (
        <div className="space-y-3 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-4 sm:space-y-0">
          {filteredArticles.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden flex flex-col"
            >
              {/* IMAGE */}
              {item.image && (
                <img
                  src={
                    item.image.startsWith("http")
                      ? item.image
                      : `http://localhost:5000/${item.image}`
                  }
                  className="w-full h-36 sm:h-40 object-cover"
                />
              )}

              {/* CONTENT */}
              <div className="p-3 flex flex-col flex-1">
                <Link to={`/article/${item.id}`}>
                  <h3 className="font-semibold text-gray-900 hover:underline line-clamp-2 text-sm sm:text-base">
                    {item.title}
                  </h3>
                </Link>

                <div className="flex items-center gap-2 mt-1">
                  <p className="text-xs text-gray-500">{item.category}</p>

                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      item.status === "published"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                {/* ACTIONS */}
                <div className="mt-3 flex flex-col sm:flex-row gap-2">
                  {["admin", "editor"].includes(role) && (
                    <button
                      onClick={() => {
                        setForm({
                          title: item.title,
                          category: item.category,
                          short_description: item.short_description,
                          content: item.content,
                          file: null,
                          image: item.image,
                          section: item.section ?? "latest",
                          status: item.status ?? "draft",
                          is_breaking: item.is_breaking ?? false,
                        });
                        setEditingId(item.id);
                        setShowForm(true);
                      }}
                      className="w-full sm:flex-1 bg-amber-500 hover:bg-amber-600 text-white text-sm py-2 rounded"
                    >
                      Edit
                    </button>
                  )}

                  {/* 🔥 ONLY ADMIN CAN SEE DELETE */}
                  <button
                    onClick={() => {
                      if (
                        confirm("Are you sure you want to delete this article?")
                      ) {
                        handleDelete(item.id);
                      }
                    }}
                    disabled={role !== "admin"}
                    className={`bg-red-500 text-white px-3 py-1 rounded ${
                      role !== "admin"
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-red-600"
                    }`}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 flex items-end sm:items-center justify-center p-2 sm:p-3">
          <div className="bg-white w-full sm:max-w-2xl rounded-t-2xl sm:rounded-xl p-4 max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
              }}
              className="absolute top-3 right-3 text-xl"
            >
              ✖
            </button>
            <div className="space-y-3">
              <input
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring"
              />

              <input
                placeholder="Category"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full border rounded-lg p-2  focus:outline-none focus:ring"
              />

              <select
                value={form.section}
                onChange={(e) => setForm({ ...form, section: e.target.value })}
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring"
              >
                <option value="latest">Latest</option>
                <option value="featured">Featured</option>
                <option value="secondary">Secondary</option>
                <option value="trending">Trending</option>
                <option value="breaking">BreakingNews</option>
              </select>
              {/* ✅ PUT BREAKING NEWS HERE */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={form.is_breaking}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      is_breaking: e.target.checked,
                    })
                  }
                  className="h-4 w-4"
                />

                <label className="font-medium">Mark as Breaking News</label>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setForm({ ...form, file: e.target.files[0] })}
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring"
              />
              {form.file ? (
                <img
                  src={URL.createObjectURL(form.file)}
                  className="w-24 mt-2 rounded"
                />
              ) : form.image ? (
                <img
                  src={
                    form.image.startsWith("http")
                      ? form.image
                      : `http://localhost:5000/${form.image}`
                  }
                  className="w-24 mt-2 rounded"
                />
              ) : null}

              <input
                placeholder="Short Description"
                value={form.short_description}
                onChange={(e) =>
                  setForm({
                    ...form,
                    short_description: e.target.value,
                  })
                }
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring"
              />

              <ReactQuill
                value={form.content}
                onChange={(v) => setForm({ ...form, content: v })}
                modules={modules}
              />

              <div className="flex gap-2 mt-4">
                {editingId ? (
                  <button
                    onClick={() => handleSubmit("published")}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Update & Publish
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => handleSubmit("draft")}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded"
                    >
                      Save Draft
                    </button>

                    <button
                      onClick={() => handleSubmit("published")}
                      className="bg-blue-600 text-white px-4 py-2"
                    >
                      Publish
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
