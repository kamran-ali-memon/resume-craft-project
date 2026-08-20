import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API, getToken } from "../context/AuthContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadResumes() {
    try {
      const response = await fetch(`${API}/resumes`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Could not load resumes");

      setResumes(data.resumes);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadResumes();
  }, []);

  async function createResume() {
    const response = await fetch(`${API}/resumes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`
      },
      body: JSON.stringify({
        title: "My New Resume",
        personal: { name: user.name }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.message || "Could not create resume");
      return;
    }

    navigate(`/editor/${data.resume._id}`);
  }

  async function deleteResume(id) {
    if (!confirm("Delete this resume permanently?")) return;

    const response = await fetch(`${API}/resumes/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${getToken()}` }
    });

    if (response.ok) {
      setResumes((current) => current.filter((resume) => resume._id !== id));
    }
  }

  return (
    <main className="min-h-[calc(100vh-65px)] bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold text-blue-600">Dashboard</p>
            <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-950">
              Hi, {user?.name?.split(" ")[0]}
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Manage all your resumes from one place.
            </p>
          </div>

          <button
            onClick={createResume}
            className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700"
          >
            + Create Resume
          </button>
        </div>

        {error && (
          <div className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <div className="mt-10 text-sm text-slate-500">Loading resumes...</div>
        ) : resumes.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-blue-50 text-2xl text-blue-600">
              +
            </div>
            <h2 className="mt-5 text-xl font-bold">No resumes yet</h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Create your first resume and start adding your professional information.
            </p>
            <button
              onClick={createResume}
              className="mt-6 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white"
            >
              Create my first resume
            </button>
          </div>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {resumes.map((resume) => (
              <div
                key={resume._id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 font-black text-blue-600">
                      R
                    </div>
                    <h2 className="mt-4 line-clamp-1 font-bold text-slate-900">
                      {resume.title}
                    </h2>
                    <p className="mt-1 text-xs text-slate-500">
                      Updated {new Date(resume.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-2">
                  <Link
                    to={`/editor/${resume._id}`}
                    className="rounded-lg bg-slate-900 px-3 py-2.5 text-center text-sm font-bold text-white hover:bg-slate-700"
                  >
                    Edit
                  </Link>
                  <Link
                    to={`/preview/${resume._id}`}
                    className="rounded-lg border border-slate-200 px-3 py-2.5 text-center text-sm font-bold text-slate-700 hover:bg-slate-50"
                  >
                    Preview
                  </Link>
                </div>

                <button
                  onClick={() => deleteResume(resume._id)}
                  className="mt-3 w-full rounded-lg px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
