import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await register(form.name, form.email, form.password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="grid min-h-[calc(100vh-65px)] place-items-center bg-slate-50 px-4 py-12">
      <form
        onSubmit={submit}
        className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8"
      >
        <h1 className="text-3xl font-black text-slate-950">Create your account</h1>
        <p className="mt-2 text-sm text-slate-500">
          Start building your professional resume today.
        </p>

        {error && (
          <div className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        <div className="mt-6 space-y-4">
          {[
            ["name", "Full name", "text", "Kamran Ali Memon"],
            ["email", "Email", "email", "you@example.com"],
            ["password", "Password", "password", "At least 6 characters"]
          ].map(([key, label, type, placeholder]) => (
            <label className="block" key={key}>
              <span className="text-sm font-semibold">{label}</span>
              <input
                type={type}
                required
                minLength={key === "password" ? 6 : undefined}
                value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                placeholder={placeholder}
              />
            </label>
          ))}
        </div>

        <button
          disabled={loading}
          className="mt-6 w-full rounded-xl bg-blue-600 px-4 py-3 font-bold text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already registered?{" "}
          <Link className="font-bold text-blue-600 hover:underline" to="/login">
            Login
          </Link>
        </p>
      </form>
    </main>
  );
}
