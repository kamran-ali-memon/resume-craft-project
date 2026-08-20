import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API, getToken } from "../context/AuthContext.jsx";
import ResumePreview from "../components/ResumePreview.jsx";

export default function Preview() {
  const { id } = useParams();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/resumes/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
      .then((res) => res.json())
      .then((data) => setResume(data.resume))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="p-10 text-center text-slate-500">Loading preview...</div>;
  }

  if (!resume) {
    return <div className="p-10 text-center text-red-600">Resume not found.</div>;
  }

  return (
    <main className="min-h-[calc(100vh-65px)] bg-slate-200 py-6 sm:py-10">
      <div className="no-print mx-auto mb-6 flex max-w-[820px] items-center justify-between gap-3 px-4">
        <Link
          to={`/editor/${id}`}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm"
        >
          ← Back to Editor
        </Link>
        <button
          onClick={() => window.print()}
          className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-bold text-white shadow-sm"
        >
          Print / Save PDF
        </button>
      </div>

      <ResumePreview resume={resume} />
    </main>
  );
}
