const Projects = ({ id, title, description, stack, setSelectedProjectId }) => {
  const techStack =
    typeof stack === "string" ? stack.split(",").map((s) => s.trim()) : [];

  return (
    <div className="group grid grid-cols-[1fr_auto] items-center py-10 border-b border-white/10">
      <div>
        <h3 className="text-xl font-semibold">{title}</h3>

        {description && (
          <p className="mt-2 text-sm text-neutral-400 max-w-xl">
            {description}
          </p>
        )}

        {techStack.length > 0 && (
          <div className="mt-3 flex gap-4 text-sm text-amber-400">
            {techStack.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={() => setSelectedProjectId(id)}
        className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition"
      >
        Read More <span>→</span>
      </button>
    </div>
  );
};

export default Projects;
