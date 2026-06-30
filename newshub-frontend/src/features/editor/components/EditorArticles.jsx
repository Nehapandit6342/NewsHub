import { useState } from "react";

import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { validateArticle } from "../../articles/validations/articleValidation";

import { useEditorArticles } from "../hooks/useEditorArticles";
import {
  useCreateArticle,
  useUpdateArticle,
} from "../../admin/hooks/useAdminArticles";

export default function EditorArticles() {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState("all");
  const [view, setView] = useState("card"); // card | table

  const [search, setSearch] = useState("");

  const { data, isLoading } = useEditorArticles();
  const createArticle = useCreateArticle();
  const updateArticle = useUpdateArticle();

  const articles = data || [];
  const isSubmitting = createArticle.isPending || updateArticle.isPending;

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
  const filteredArticles = articles
    .filter((a) => (filter === "all" ? true : a.status === filter))
    .filter((a) => a.title.toLowerCase().includes(search.toLowerCase()));

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

  //  react quill
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
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Articles</h2>

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
          className="bg-black text-white px-4 py-2 rounded"
        >
          + New Article
        </button>
      </div>

      {/* SEARCH */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 Search articles..."
          className="border px-3 py-2 rounded w-full sm:w-1/2"
        />

        {/* VIEW TOGGLE */}
        <div className="flex gap-2">
          <button
            onClick={() => setView("card")}
            className={`px-3 py-1 border rounded ${
              view === "card" ? "bg-black text-white" : ""
            }`}
          >
            ⊞
          </button>

          <button
            onClick={() => setView("table")}
            className={`px-3 py-1 border rounded ${
              view === "table" ? "bg-black text-white" : ""
            }`}
          >
            ☰
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        {/* FILTER BUTTONS */}
        <div className="flex gap-2">
          {["all", "draft", "pending", "published"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded border text-sm ${
                filter === f ? "bg-black text-white" : ""
              }`}
            >
              {f.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* LIST */}
      {isLoading ? (
        <p>Loading...</p>
      ) : filteredArticles.length === 0 ? (
        <p className="text-center text-gray-500 py-10">No articles found</p>
      ) : view === "card" ? (
        <div className="space-y-3 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-4 sm:space-y-0">
          {filteredArticles.map((item) => (
            <div key={item.id} className="flex items-start gap-2">
              {/* Card */}
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden flex flex-col flex-1">
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
                  <p className="text-sm text-gray-500">By {item.editor_name}</p>

                  <p className="text-xs text-gray-400 mt-2">
                    {item.created_at
                      ? new Date(item.created_at).toLocaleDateString()
                      : "-"}
                  </p>

                  <div className="mt-3 flex flex-col sm:flex-row gap-2">
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
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 border">Image</th>
                <th className="p-3 border text-left">Title</th>
                <th className="p-3 border text-left">Category</th>
                <th className="p-3 border text-left">Status</th>
                <th className="p-3 border text-left">Date</th>
                <th className="p-3 border text-center w-40">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredArticles.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="p-3 border">
                    <img
                      src={
                        item.image?.startsWith("http")
                          ? item.image
                          : `http://localhost:5000/${item.image}`
                      }
                      alt=""
                      className="w-12 h-12 object-cover rounded"
                    />
                  </td>

                  <td className="p-3 border">{item.title}</td>

                  <td className="p-3 border">{item.category}</td>

                  <td className="p-3 border">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        item.status === "published"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="p-3 border">
                    {item.created_at
                      ? new Date(item.created_at).toLocaleDateString()
                      : "-"}
                  </td>

                  <td className="p-3 border">
                    <div className="flex items-center justify-center gap-2">
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
                        className="bg-amber-500 text-white px-2 py-1 rounded"
                      >
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
                    onClick={() => handleSubmit("pending")}
                    disabled={isSubmitting}
                    className="bg-blue-600 text-white px-4 py-2 disabled:opacity-50"
                  >
                    {isSubmitting ? "Saving..." : " Update & submit"}
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => handleSubmit("draft")}
                      disabled={isSubmitting}
                      className="bg-blue-600 text-white px-4 py-2 disabled:opacity-50"
                    >
                      {isSubmitting ? "Saving..." : "Save Draft"}
                    </button>

                    <button
                      onClick={() => handleSubmit("pending")}
                      disabled={isSubmitting}
                      className="bg-blue-600 text-white px-4 py-2 disabled:opacity-50"
                    >
                      {isSubmitting ? "Saving..." : "Submit For Review"}
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
