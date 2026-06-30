import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import {
  useEditors,
  useCreateEditor,
  useDeleteEditor,
} from "../hooks/useEditors";

export default function Editors() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const { data: editors, isLoading } = useEditors();
  const createEditor = useCreateEditor();
  const deleteEditor = useDeleteEditor();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      toast.error("All fields are required");
      return;
    }

    createEditor.mutate(form, {
      onSuccess: () => {
        toast.success("Editor created");
        setForm({ name: "", email: "", password: "" });
      },
      onError: () => toast.error("Failed to create editor"),
    });
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8 text-gray-900 dark:text-white">
      <ToastContainer />

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Editors Management
        </h1>
        <span className="text-xs bg-red-600 text-white px-3 py-1 rounded">
          Admin Panel
        </span>
      </div>

      {/* CREATE FORM */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
        <h2 className="font-semibold text-xl text-gray-900 dark:text-white">
          Create New Editor
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg p-3 focus:ring-2 focus:ring-red-500 focus:outline-none"
          />

          <input
            placeholder="Email Address"
            value={form.email}
            autoComplete="off"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg p-3 focus:ring-2 focus:ring-red-500 focus:outline-none"
          />
          <div className="relative">
            <input
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg p-3 focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500 dark:text-gray-400 hover:text-red-600"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
          <button
            type="submit"
            disabled={createEditor.isLoading}
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
          >
            {createEditor.isLoading ? "Creating..." : "Create Editor"}
          </button>
        </form>
      </div>

      {/* LIST */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="font-semibold text-xl mb-5 text-gray-900  dark:text-white ">
          All Editors
        </h2>

        {isLoading ? (
          <p className="text-gray-500 dark:text-gray-400">Loading...</p>
        ) : (
          <div className="grid gap-4">
            {editors?.length === 0 && (
              <p className="text-gray-500 dark:text-gray-400">
                No editors found
              </p>
            )}

            {editors?.map((e) => (
              <div
                key={e.id}
                className="flex justify-between items-center p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 hover:shadow-md transition"
              >
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white">
                    {e.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {e.email}
                  </p>
                </div>

                <button
                  onClick={() => {
                    if (confirm("Delete this editor?")) {
                      deleteEditor.mutate(e.id, {
                        onSuccess: () => toast.success("Deleted"),
                      });
                    }
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
