import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="grid min-h-[calc(100vh-65px)] place-items-center bg-slate-50 px-4">
      <div className="text-center">
        <p className="text-6xl font-black text-blue-600">404</p>
        <h1 className="mt-4 text-2xl font-black">Page not found</h1>
        <p className="mt-2 text-sm text-slate-500">
          The page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white"
        >
          Go Home
        </Link>
      </div>
    </main>
  );
}
