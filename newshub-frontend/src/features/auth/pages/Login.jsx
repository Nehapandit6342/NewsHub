import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const { mutate, isPending } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();

    setError("");

    mutate(
      { email, password },
      {
        onSuccess: (data) => {
          // clear old data
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("role");

          // store new auth
          const storage = rememberMe ? localStorage : sessionStorage;

          storage.setItem("token", data.token);
          storage.setItem("role", data.admin.role);

          console.log("LOGIN ROLE:", data.admin.role);

          // ✅ FIX ROLE CHECK
          if (data.admin.role === "admin") {
            navigate("/admin/dashboard");
          } else if (data.admin.role === "editor") {
            navigate("/admin/articles");
          } else {
            navigate("/");
          }
        },
        onError: (err) => {
          setError(err?.response?.data?.message || "Login failed");
        },
      },
    );
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-lg shadow-md w-80 space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Admin Login</h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full border p-2 rounded pr-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-2 text-gray-500"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        {/* REMEMBER ME */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label>Remember me</label>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-black text-white p-2 rounded"
        >
          {isPending ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
