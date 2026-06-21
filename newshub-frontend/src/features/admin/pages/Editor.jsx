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
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      <ToastContainer />

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Editors Management</h1>
        <span className="text-xs bg-black text-white px-3 py-1 rounded">
          Admin Panel
        </span>
      </div>

      {/* CREATE FORM */}
      <div className="bg-white shadow rounded-xl p-5 space-y-4">
        <h2 className="font-semibold text-lg">Create New Editor</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border p-2 rounded"
          />

          <input
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border p-2 rounded"
          />

          <input
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full border p-2 rounded"
          />

          <button
            type="submit"
            disabled={createEditor.isLoading}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            {createEditor.isLoading ? "Creating..." : "Create Editor"}
          </button>
        </form>
      </div>

      {/* LIST */}
      <div className="bg-white shadow rounded-xl p-5">
        <h2 className="font-semibold text-lg mb-4">All Editors</h2>

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="space-y-3">
            {editors?.length === 0 && (
              <p className="text-gray-500">No editors found</p>
            )}

            {editors?.map((e) => (
              <div
                key={e.id}
                className="flex justify-between items-center border p-3 rounded"
              >
                <div>
                  <p className="font-medium">{e.name}</p>
                  <p className="text-sm text-gray-500">{e.email}</p>
                </div>

                <button
                  onClick={() => {
                    if (confirm("Delete this editor?")) {
                      deleteEditor.mutate(e.id, {
                        onSuccess: () => toast.success("Deleted"),
                      });
                    }
                  }}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
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
