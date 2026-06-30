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
  useBulkDeleteArticles,
  useBulkArchiveArticles,
  useApproveArticle,
} from "../hooks/useAdminArticles";

export default function AdminArticles() {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState("all");
  const [view, setView] = useState("card"); // card | table
  const [selectedIds, setSelectedIds] = useState([]);
  const [search, setSearch] = useState("");
  const role = getRole();
  const { data, isLoading } = useAdminArticles();
  const createArticle = useCreateArticle();
  const updateArticle = useUpdateArticle();
  const deleteArticle = useDeleteArticle();
  const bulkDelete = useBulkDeleteArticles();
  const [bulkAction, setBulkAction] = useState(null);
  const bulkArchive = useBulkArchiveArticles();
  const [selectionMode, setSelectionMode] = useState(false);
  const approveArticle = useApproveArticle();

  const articles = data || [];
  console.log("ADMIN ARTICLES:", articles);
  console.log("COUNT:", articles.length);

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

  // DELETE
  const handleDelete = (id) => {
    deleteArticle.mutate(id, {
      onSuccess: () => toast.success("Deleted"),
    });
  };
  // bulk delete
  const handleBulkDelete = () => {
    if (selectedIds.length === 0) {
      toast.error("No articles selected");
      return;
    }

    if (!confirm(`Delete ${selectedIds.length} articles?`)) return;

    bulkDelete.mutate(
      { ids: selectedIds },
      {
        onSuccess: () => {
          toast.success("Articles deleted");
          setSelectedIds([]);
        },
      },
    );
  };
  // bulk archieve
  const handleBulkArchive = () => {
    if (selectedIds.length === 0) {
      toast.error("No articles selected");
      return;
    }
    toast(
      (t) => (
        <div>
          <p>Archive selected articles?</p>

          <div className="flex gap-2 mt-2">
            <button
              className="bg-gray-700 text-white px-2 py-1 rounded"
              onClick={() => {
                bulkArchive.mutate(
                  { ids: selectedIds },
                  {
                    onSuccess: () => {
                      toast.success("Archived successfully");
                      setSelectedIds([]);
                      setSelectionMode(false);
                      setBulkAction(null);
                      toast.dismiss(t.id);
                    },
                  },
                );
              }}
            >
              Yes
            </button>

            <button
              className="bg-gray-300 px-2 py-1 rounded"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { autoClose: false },
    );
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

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const selectAll = () => {
    if (selectedIds.length === filteredArticles.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredArticles.map((a) => a.id));
    }
  };

  return (
    <div className="p-3 sm:p-4 md:p-6 max-w-7xl mx-auto text-gray-900 dark:text-white">
      <ToastContainer />
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {" "}
          Articles
        </h2>

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
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
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
          className="w-full sm:w-1/2 px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        {/* VIEW TOGGLE */}
        <div className="flex gap-2">
          <button
            onClick={() => setView("card")}
            className={`px-3 py-1 rounded border transition ${
              view === "card"
                ? "bg-red-600 text-white border-red-600"
                : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            ⊞
          </button>

          <button
            onClick={() => setView("table")}
            className={`px-3 py-1 rounded border transition ${
              view === "table"
                ? "bg-red-600 text-white border-red-600"
                : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            ☰
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        {/* FILTER BUTTONS */}
        <div className="flex gap-2">
          {["all", "pending", "published", "draft", "archive"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded border text-sm transition ${
                filter === f
                  ? "bg-red-600 text-white border-red-600"
                  : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              {f.toUpperCase()}
            </button>
          ))}
        </div>

        {/* BULK ACTIONS */}
        <div className="flex items-center gap-2">
          <select
            className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 rounded"
            value={bulkAction || ""}
            onChange={(e) => {
              const value = e.target.value;
              if (!value) return;
              setSelectionMode(true);
              setBulkAction(value);
              setSelectedIds([]); //  clean reset
            }}
          >
            <option value="">Bulk Actions</option>
            <option value="delete">Delete</option>
            <option value="archive">Archive</option>
          </select>
          {/* CONFIRM ACTION BAR */}
          {selectionMode && (
            <div className="flex items-center gap-2 mt-3">
              <button
                onClick={() => {
                  if (!bulkAction) {
                    toast.error("Select an action first");
                    return;
                  }

                  if (selectedIds.length === 0) {
                    toast.error("No articles selected");
                    return;
                  }

                  if (bulkAction === "delete") {
                    toast(
                      (t) => (
                        <div>
                          <p>Delete {selectedIds.length} article(s)?</p>

                          <div className="flex gap-2 mt-2">
                            <button
                              className="bg-red-600 text-white px-2 py-1 rounded"
                              onClick={() => {
                                bulkDelete.mutate(
                                  { ids: selectedIds },
                                  {
                                    onSuccess: () => {
                                      toast.success("Deleted successfully");
                                      setSelectedIds([]);
                                      setSelectionMode(false);
                                      setBulkAction(null);
                                      toast.dismiss(t.id);
                                    },
                                  },
                                );
                              }}
                            >
                              Yes
                            </button>

                            <button
                              className="bg-gray-300 px-2 py-1 rounded"
                              onClick={() => toast.dismiss(t.id)}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ),
                      { autoClose: false },
                    );

                    return;
                  }
                  if (bulkAction === "archive") {
                    toast(
                      (t) => (
                        <div>
                          <p>Archive {selectedIds.length} article(s)?</p>

                          <div className="flex gap-2 mt-2">
                            <button
                              className="bg-black text-white px-2 py-1 rounded"
                              onClick={() => {
                                bulkArchive.mutate(
                                  { ids: selectedIds },
                                  {
                                    onSuccess: () => {
                                      toast.success("Archived successfully");
                                      setSelectedIds([]);
                                      setSelectionMode(false);
                                      setBulkAction(null);
                                      toast.dismiss(t.id);
                                    },
                                  },
                                );
                              }}
                            >
                              Yes
                            </button>

                            <button
                              className="bg-gray-300 px-2 py-1 rounded"
                              onClick={() => toast.dismiss(t.id)}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ),
                      { autoClose: false },
                    );

                    return;
                  }
                }}
                className="bg-black text-white px-3 py-1 rounded"
              >
                Confirm {bulkAction}
              </button>

              <button
                onClick={() => {
                  setSelectionMode(false);
                  setSelectedIds([]);
                  setBulkAction(null);
                }}
                className="bg-gray-300 px-3 py-1 rounded"
              >
                Cancel
              </button>
            </div>
          )}

          {selectedIds.length > 0 && (
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {selectedIds.length} selected
            </span>
          )}
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
              {/* Checkbox */}
              {selectionMode && (
                <input
                  type="checkbox"
                  checked={selectedIds.includes(item.id)}
                  onChange={() => toggleSelect(item.id)}
                  className="mt-3"
                />
              )}
              {/* Card */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md border border-gray-200 dark:border-gray-700 transition overflow-hidden flex flex-col flex-1">
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
                    <h3 className="font-semibold text-gray-900 dark:text-white hover:underline line-clamp-2 text-sm sm:text-base">
                      {item.title}
                    </h3>
                  </Link>

                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {item.category}
                    </p>

                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        item.status === "published"
                          ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                          : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    By {item.editor_name}
                  </p>

                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
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

                    {item.status === "pending" && (
                      <button
                        onClick={() => {
                          console.log("Approve clicked", item.id);
                          approveArticle.mutate(item.id);
                        }}
                        className="bg-green-600 text-white px-3 py-1 rounded"
                      >
                        Approve
                      </button>
                    )}

                    <button
                      onClick={() => {
                        if (
                          confirm(
                            "Are you sure you want to delete this article?",
                          )
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
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                {selectionMode && (
                  <th className="p-3 border w-10 text-center">
                    <input
                      type="checkbox"
                      checked={
                        selectedIds.length === filteredArticles.length &&
                        filteredArticles.length > 0
                      }
                      onChange={selectAll}
                    />
                  </th>
                )}
                <th className="p-3 border border-gray-200 dark:border-gray-700">
                  Image
                </th>
                <th className="p-3 border border-gray-200 dark:border-gray-700 text-left text-gray-900 dark:text-white">
                  Title
                </th>
                <th className="p-3 border border-gray-200 dark:border-gray-700 text-left text-gray-900 dark:text-white">
                  Category
                </th>
                <th className="p-3 border border-gray-200 dark:border-gray-700 text-left text-gray-900 dark:text-white">
                  Status
                </th>
                <th className="p-3 border border-gray-200 dark:border-gray-700 text-left text-gray-900 dark:text-white">
                  Date
                </th>
                <th className="p-3 border border-gray-200 dark:border-gray-700 text-center text-gray-900 dark:text-white w-56">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredArticles.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  {selectionMode && (
                    <td className="p-3 border text-center w-10">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(item.id)}
                        onChange={() => toggleSelect(item.id)}
                      />
                    </td>
                  )}
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

                  <td className="p-3 border border-gray-200 dark:border-gray-700">
                    <Link
                      to={`/article/${item.id}`}
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {item.title}
                    </Link>
                  </td>

                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300">
                    {item.category}
                  </td>

                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        item.status === "published"
                          ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                          : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300">
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
                        className="px-3 py-1 rounded bg-amber-500 hover:bg-amber-600 text-white transition"
                      >
                        Edit
                      </button>

                      {item.status === "pending" && (
                        <button
                          onClick={() => {
                            console.log("Approve clicked", item.id);
                            approveArticle.mutate(item.id);
                          }}
                          className="px-3 py-1 rounded bg-green-600 hover:bg-green-700 text-white transition"
                        >
                          Approve
                        </button>
                      )}
                      <button
                        onClick={() => {
                          if (
                            confirm(
                              "Are you sure you want to delete this article?",
                            )
                          ) {
                            handleDelete(item.id);
                          }
                        }}
                        disabled={role !== "admin"}
                        className={`px-3 py-1 rounded text-white transition ${
                          role !== "admin"
                            ? "bg-red-400 opacity-50 cursor-not-allowed"
                            : "bg-red-500 hover:bg-red-600"
                        }`}
                      >
                        Delete
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
          <div className="bg-white dark:bg-gray-800 w-full sm:max-w-2xl rounded-t-2xl sm:rounded-xl p-4 max-h-[90vh] overflow-y-auto relative text-gray-900 dark:text-white">
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
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg p-2 focus:outline-none focus:ring"
              />

              <input
                placeholder="Category"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg p-2 focus:outline-none focus:ring"
              />

              <select
                value={form.section}
                onChange={(e) => setForm({ ...form, section: e.target.value })}
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg p-2 focus:outline-none focus:ring"
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
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg p-2 focus:outline-none focus:ring"
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
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg p-2 focus:outline-none focus:ring"
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
