import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API, getToken } from "../context/AuthContext.jsx";
import FormField from "../components/FormField.jsx";
import ResumePreview from "../components/ResumePreview.jsx";

const emptyResume = {
  title: "My Resume",
  personal: {
    name: "",
    role: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    github: "",
    linkedin: ""
  },
  summary: "",
  skills: [],
  languages: [],
  education: [],
  experience: [],
  projects: []
};

const tabs = ["Personal", "Summary", "Experience", "Education", "Projects", "Skills"];

export default function Editor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resume, setResume] = useState(emptyResume);
  const [activeTab, setActiveTab] = useState("Personal");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch(`${API}/resumes/${id}`, {
          headers: { Authorization: `Bearer ${getToken()}` }
        });
        const data = await response.json();

        if (!response.ok) throw new Error(data.message || "Resume not found");

        setResume(data.resume);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  const updatePersonal = (key, value) => {
    setResume((current) => ({
      ...current,
      personal: { ...current.personal, [key]: value }
    }));
  };

  const updateArrayItem = (section, index, key, value) => {
    setResume((current) => ({
      ...current,
      [section]: current[section].map((item, i) =>
        i === index ? { ...item, [key]: value } : item
      )
    }));
  };

  const addItem = (section, item) => {
    setResume((current) => ({
      ...current,
      [section]: [...current[section], item]
    }));
  };

  const removeItem = (section, index) => {
    setResume((current) => ({
      ...current,
      [section]: current[section].filter((_, i) => i !== index)
    }));
  };

  async function save() {
    setSaving(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch(`${API}/resumes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`
        },
        body: JSON.stringify(resume)
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Could not save");

      setResume(data.resume);
      setMessage("Saved successfully");
      setTimeout(() => setMessage(""), 2500);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  const section = useMemo(() => {
    if (activeTab === "Personal") {
      return (
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <FormField
              label="Resume title"
              value={resume.title}
              onChange={(value) => setResume({ ...resume, title: value })}
              placeholder="Frontend Developer Resume"
            />
          </div>
          <FormField label="Full name" value={resume.personal.name} onChange={(v) => updatePersonal("name", v)} placeholder="Your Name" />
          <FormField label="Professional role" value={resume.personal.role} onChange={(v) => updatePersonal("role", v)} placeholder="Frontend Developer" />
          <FormField label="Email" value={resume.personal.email} onChange={(v) => updatePersonal("email", v)} placeholder="you@example.com" type="email" />
          <FormField label="Phone" value={resume.personal.phone} onChange={(v) => updatePersonal("phone", v)} placeholder="+92 300 0000000" />
          <FormField label="Location" value={resume.personal.location} onChange={(v) => updatePersonal("location", v)} placeholder="Karachi, Pakistan" />
          <FormField label="Website" value={resume.personal.website} onChange={(v) => updatePersonal("website", v)} placeholder="yourwebsite.com" />
          <FormField label="GitHub" value={resume.personal.github} onChange={(v) => updatePersonal("github", v)} placeholder="github.com/username" />
          <FormField label="LinkedIn" value={resume.personal.linkedin} onChange={(v) => updatePersonal("linkedin", v)} placeholder="linkedin.com/in/username" />
        </div>
      );
    }

    if (activeTab === "Summary") {
      return (
        <FormField
          label="Professional summary"
          textarea
          value={resume.summary}
          onChange={(value) => setResume({ ...resume, summary: value })}
          placeholder="Write 3–5 lines that summarize your strengths, experience and career direction."
        />
      );
    }

    if (activeTab === "Skills") {
      return (
        <TagEditor
          title="Skills"
          items={resume.skills}
          placeholder="e.g. React"
          onChange={(items) => setResume({ ...resume, skills: items })}
        />
      );
    }

    if (activeTab === "Experience") {
      return (
        <ItemEditor
          items={resume.experience}
          section="experience"
          add={() =>
            addItem("experience", {
              title: "",
              organization: "",
              startDate: "",
              endDate: "",
              location: "",
              description: ""
            })
          }
          remove={removeItem}
          update={updateArrayItem}
          labels={["Job title", "Company", "Start date", "End date", "Location", "Description"]}
        />
      );
    }

    if (activeTab === "Education") {
      return (
        <ItemEditor
          items={resume.education}
          section="education"
          add={() =>
            addItem("education", {
              title: "",
              organization: "",
              startDate: "",
              endDate: "",
              location: "",
              description: ""
            })
          }
          remove={removeItem}
          update={updateArrayItem}
          labels={["Degree / program", "Institute", "Start date", "End date", "Location", "Description"]}
        />
      );
    }

    return (
      <ProjectEditor
        items={resume.projects}
        add={() =>
          addItem("projects", {
            name: "",
            technologies: "",
            description: "",
            link: ""
          })
        }
        remove={removeItem}
        update={updateArrayItem}
      />
    );
  }, [activeTab, resume]);

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-50">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
      </div>
    );
  }

  if (error && !resume._id) {
    return <div className="p-8 text-center text-red-600">{error}</div>;
  }

  return (
    <main className="min-h-[calc(100vh-65px)] bg-slate-100">
      <div className="no-print sticky top-[65px] z-40 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <button
              onClick={() => navigate("/dashboard")}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50"
            >
              ← Back
            </button>
            <span className="truncate text-sm font-bold text-slate-800">
              {resume.title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {message && (
              <span className="text-xs font-semibold text-emerald-600">{message}</span>
            )}
            <Link
              to={`/preview/${id}`}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold text-slate-700"
            >
              Preview
            </Link>
            <button
              onClick={save}
              disabled={saving}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700 disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>

        <div className="overflow-x-auto border-t border-slate-100">
          <div className="mx-auto flex max-w-[1500px] gap-1 px-4 sm:px-6">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap border-b-2 px-3 py-3 text-sm font-bold transition ${
                  activeTab === tab
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-slate-500 hover:text-slate-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {error && (
        <div className="no-print mx-auto max-w-[1500px] px-4 pt-4 text-sm font-medium text-red-600 sm:px-6">
          {error}
        </div>
      )}

      <div className="mx-auto grid max-w-[1500px] gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(0,520px)_minmax(0,1fr)]">
        <section className="no-print min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          {section}
        </section>

        <section className="min-w-0 lg:sticky lg:top-[155px] lg:max-h-[calc(100vh-175px)] lg:overflow-auto">
          <ResumePreview resume={resume} />
        </section>
      </div>
    </main>
  );
}

function TagEditor({ title, items, placeholder, onChange }) {
  const [value, setValue] = useState("");

  function add() {
    const cleaned = value.trim();
    if (!cleaned) return;
    onChange([...items, cleaned]);
    setValue("");
  }

  return (
    <div>
      <h2 className="text-lg font-black">{title}</h2>
      <p className="mt-1 text-sm text-slate-500">
        Add one item at a time.
      </p>

      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), add())}
          placeholder={placeholder}
          className="w-full rounded-xl border border-slate-200 px-3.5 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
        />
        <button
          onClick={add}
          className="rounded-xl bg-slate-900 px-5 py-3 font-bold text-white"
        >
          Add
        </button>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {items.map((item, index) => (
          <button
            key={`${item}-${index}`}
            onClick={() => onChange(items.filter((_, i) => i !== index))}
            className="rounded-lg bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700 hover:bg-red-50 hover:text-red-600"
            title="Click to remove"
          >
            {item} ×
          </button>
        ))}
      </div>
    </div>
  );
}

function ItemEditor({ items, section, add, remove, update, labels }) {
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-black">
            {section === "experience" ? "Work experience" : "Education"}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Add as many entries as you need.
          </p>
        </div>
        <button
          onClick={add}
          className="shrink-0 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white"
        >
          + Add
        </button>
      </div>

      <div className="mt-6 space-y-5">
        {items.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
            No entries yet. Click “Add”.
          </div>
        )}

        {items.map((item, index) => (
          <div key={item._id || index} className="rounded-2xl border border-slate-200 p-4">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                Entry {index + 1}
              </span>
              <button
                onClick={() => remove(section, index)}
                className="text-xs font-bold text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField label={labels[0]} value={item.title} onChange={(v) => update(section, index, "title", v)} />
              <FormField label={labels[1]} value={item.organization} onChange={(v) => update(section, index, "organization", v)} />
              <FormField label={labels[2]} value={item.startDate} onChange={(v) => update(section, index, "startDate", v)} placeholder="2024" />
              <FormField label={labels[3]} value={item.endDate} onChange={(v) => update(section, index, "endDate", v)} placeholder="Present" />
              <div className="sm:col-span-2">
                <FormField label={labels[4]} value={item.location} onChange={(v) => update(section, index, "location", v)} />
              </div>
              <div className="sm:col-span-2">
                <FormField label={labels[5]} value={item.description} onChange={(v) => update(section, index, "description", v)} textarea placeholder="Describe your responsibilities and achievements." />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectEditor({ items, add, remove, update }) {
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-black">Projects</h2>
          <p className="mt-1 text-sm text-slate-500">
            Highlight projects that demonstrate your skills.
          </p>
        </div>
        <button
          onClick={add}
          className="shrink-0 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white"
        >
          + Add
        </button>
      </div>

      <div className="mt-6 space-y-5">
        {items.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
            No projects yet. Click “Add”.
          </div>
        )}

        {items.map((item, index) => (
          <div key={item._id || index} className="rounded-2xl border border-slate-200 p-4">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                Project {index + 1}
              </span>
              <button
                onClick={() => remove("projects", index)}
                className="text-xs font-bold text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>

            <div className="grid gap-4">
              <FormField label="Project name" value={item.name} onChange={(v) => update("projects", index, "name", v)} />
              <FormField label="Technologies" value={item.technologies} onChange={(v) => update("projects", index, "technologies", v)} placeholder="React, Tailwind CSS, Node.js" />
              <FormField label="Project link" value={item.link} onChange={(v) => update("projects", index, "link", v)} placeholder="github.com/username/project" />
              <FormField label="Description" value={item.description} onChange={(v) => update("projects", index, "description", v)} textarea placeholder="Explain what you built and what you contributed." />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
