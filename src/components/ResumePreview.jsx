function Section({ title, children }) {
  return (
    <section className="mt-7">
      <h2 className="border-b border-slate-300 pb-1.5 text-sm font-extrabold uppercase tracking-[0.18em] text-slate-800">
        {title}
      </h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function Empty({ children }) {
  return children ? <>{children}</> : null;
}

export default function ResumePreview({ resume }) {
  const p = resume?.personal || {};

  return (
    <article className="print-page mx-auto min-h-[1120px] w-full max-w-[820px] bg-white p-7 shadow-xl sm:p-10 lg:p-12">
      <header className="border-b-2 border-slate-900 pb-5">
        <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
          {p.name || "Your Name"}
        </h1>
        <p className="mt-1 text-base font-semibold text-blue-700">
          {p.role || "Professional Title"}
        </p>

        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
          <Empty>{p.email && <span>{p.email}</span>}</Empty>
          <Empty>{p.phone && <span>{p.phone}</span>}</Empty>
          <Empty>{p.location && <span>{p.location}</span>}</Empty>
          <Empty>{p.website && <span>{p.website}</span>}</Empty>
          <Empty>{p.github && <span>{p.github}</span>}</Empty>
          <Empty>{p.linkedin && <span>{p.linkedin}</span>}</Empty>
        </div>
      </header>

      {resume.summary && (
        <Section title="Professional Summary">
          <p className="whitespace-pre-line text-sm leading-6 text-slate-700">
            {resume.summary}
          </p>
        </Section>
      )}

      {resume.experience?.length > 0 && (
        <Section title="Experience">
          <div className="space-y-5">
            {resume.experience.map((item) => (
              <div key={item._id || Math.random()}>
                <div className="flex flex-col justify-between gap-1 sm:flex-row">
                  <div>
                    <h3 className="font-bold text-slate-900">{item.title}</h3>
                    <p className="text-sm font-medium text-blue-700">
                      {item.organization}
                    </p>
                  </div>
                  <p className="text-xs font-medium text-slate-500">
                    {item.startDate}
                    {item.endDate ? ` — ${item.endDate}` : ""}
                    {item.location ? ` · ${item.location}` : ""}
                  </p>
                </div>
                {item.description && (
                  <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-700">
                    {item.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {resume.education?.length > 0 && (
        <Section title="Education">
          <div className="space-y-4">
            {resume.education.map((item) => (
              <div key={item._id || Math.random()}>
                <div className="flex flex-col justify-between gap-1 sm:flex-row">
                  <div>
                    <h3 className="font-bold text-slate-900">{item.title}</h3>
                    <p className="text-sm text-blue-700">{item.organization}</p>
                  </div>
                  <p className="text-xs text-slate-500">
                    {item.startDate}
                    {item.endDate ? ` — ${item.endDate}` : ""}
                  </p>
                </div>
                {item.description && (
                  <p className="mt-1 text-sm text-slate-600">{item.description}</p>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {resume.projects?.length > 0 && (
        <Section title="Projects">
          <div className="space-y-4">
            {resume.projects.map((project) => (
              <div key={project._id || Math.random()}>
                <h3 className="font-bold text-slate-900">{project.name}</h3>
                {project.technologies && (
                  <p className="mt-0.5 text-xs font-semibold text-blue-700">
                    {project.technologies}
                  </p>
                )}
                {project.description && (
                  <p className="mt-1 whitespace-pre-line text-sm leading-6 text-slate-700">
                    {project.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {resume.skills?.length > 0 && (
        <Section title="Skills">
          <div className="flex flex-wrap gap-2">
            {resume.skills.map((skill, index) => (
              <span
                key={`${skill}-${index}`}
                className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </Section>
      )}

      {resume.languages?.length > 0 && (
        <Section title="Languages">
          <p className="text-sm text-slate-700">{resume.languages.join(" · ")}</p>
        </Section>
      )}
    </article>
  );
}
