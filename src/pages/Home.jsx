import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const features = [
  ["01", "Easy editing", "Fill in your details with a simple guided editor."],
  ["02", "Live preview", "See your professional resume while you build it."],
  ["03", "Responsive", "Works smoothly on phones, tablets and desktops."],
  ["04", "Cloud saved", "Your resumes are stored securely in MongoDB."]
];

export default function Home() {
  const { user } = useAuth();

  return (
    <main>
      <section className="overflow-hidden bg-slate-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[1.1fr_.9fr] lg:px-8">
          <div className="self-center">
            <span className="inline-flex rounded-full border border-blue-400/30 bg-blue-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-300">
              Professional resume builder
            </span>

            <h1 className="mt-6 max-w-3xl text-4xl font-black tracking-tight sm:text-6xl">
              Build a resume that gets you noticed.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              ResumeCraft gives you a clean editor, live preview and cloud-backed
              resume management in one simple application.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to={user ? "/dashboard" : "/register"}
                className="rounded-xl bg-blue-600 px-5 py-3 text-center text-sm font-bold text-white shadow-lg shadow-blue-950/30 hover:bg-blue-500"
              >
                {user ? "Open Dashboard" : "Create My Resume"}
              </Link>
              <Link
                to="/login"
                className="rounded-xl border border-slate-700 px-5 py-3 text-center text-sm font-bold text-slate-200 hover:bg-slate-900"
              >
                I already have an account
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur">
            <div className="rounded-2xl bg-white p-6 text-slate-900 shadow-xl sm:p-8">
              <div className="border-b-2 border-slate-900 pb-4">
                <div className="h-7 w-52 rounded bg-slate-900" />
                <div className="mt-2 h-3 w-36 rounded bg-blue-600" />
                <div className="mt-4 h-2 w-full rounded bg-slate-200" />
              </div>
              <div className="mt-6 space-y-4">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item}>
                    <div className="h-3 w-28 rounded bg-slate-800" />
                    <div className="mt-2 h-2 w-full rounded bg-slate-200" />
                    <div className="mt-2 h-2 w-4/5 rounded bg-slate-200" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(([number, title, text]) => (
              <div
                key={number}
                className="rounded-2xl border border-slate-200 p-6 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="text-sm font-black text-blue-600">{number}</span>
                <h2 className="mt-4 text-lg font-bold">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
