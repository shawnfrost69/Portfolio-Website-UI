import { useEffect } from "react";
import { motion } from "motion/react";

const STACK_ICONS = {
  "C#": "/assets/logos/csharp.svg",
  ".NET": "/assets/logos/dotnet.svg",
  "EF Core": "/assets/logos/dotnetcore.svg",
  "SQL Server": "/assets/logos/sqlserver.svg",
  TailwindCSS: "/assets/logos/tailwindcss.svg",
  JavaScript: "/assets/logos/javascript.svg",
  "Chrome Extension (Manifest V3)": "/assets/logos/mainfest.jpeg",
  HTML: "/assets/logos/html5.svg",
  "CSS (Glassmorphism)": "/assets/logos/css3.svg",
  React: "/assets/logos/react.svg",
  "Bootstrap 5": "/assets/logos/bootstrap.jpeg",
  Vercel: "/assets/logos/vercel.png",
  "HTML5 Canvas": "/assets/logos/html5.svg",
  GSAP: "/assets/logos/gsap.png",
};

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5137";

const ProjectDetails = ({ project, closeModal }) => {
  if (!project) return null;

  // ESC close
  useEffect(() => {
    const esc = (e) => e.key === "Escape" && closeModal();
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [closeModal]);

  const techStack =
    typeof project.stack === "string"
      ? project.stack.split(",").map((s) => s.trim())
      : [];

  const backendImage = project.image || project.Image;

  const imageSrc = backendImage
    ? backendImage.startsWith("http")
      ? backendImage
      : `${API_BASE}${backendImage}`
    : "/assets/projects/placeholder.png";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={closeModal}
      />

      {/* MODAL */}
      <motion.div
        className="relative z-10 w-full max-w-[550px] max-h-[90vh]
        rounded-2xl overflow-hidden
        bg-gradient-to-l from-midnight to-navy
        border border-white/10"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        {/* HEADER */}
        <div className="relative">
          <button
            onClick={closeModal}
            className="absolute top-5 right-5 z-20
            w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 transition"
          >
            ✕
          </button>

          <img
            src={imageSrc}
            alt={project.title}
            className="w-full h-64 object-cover"
          />
        </div>

        {/* CONTENT (scrollable) */}
        <div className="flex flex-col max-h-[calc(90vh-14rem)]">
          <div className="px-8 py-6 overflow-y-auto flex-1">
            <h5 className="text-lg font-medium text-white">{project.title}</h5>

            <p className="mt-2 text-sm text-neutral-400">
              {project.description}
            </p>

            {project.features?.length > 0 && (
              <ul className="mt-1 space-y-2 text-sm text-neutral-300">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex gap-3 leading-6">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-aqua shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* FOOTER */}
          <div
            className="px-5 py-10
            bg-gradient-to-l from-midnight to-navy"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
              {/* TECH STACK */}
              <div className="flex items-center gap-3 flex-wrap">
                {techStack.map(
                  (tech) =>
                    STACK_ICONS[tech] && (
                      <div
                        key={tech}
                        className="w-9 h-9 flex items-center justify-center
                        rounded-lg bg-white/5 border border-white/10
                        hover:bg-white/10 transition"
                        title={tech}
                      >
                        <img
                          src={STACK_ICONS[tech]}
                          alt={tech}
                          className="w-5 h-5"
                        />
                      </div>
                    ),
                )}
              </div>

              {/* ACTIONS */}
              <div className="flex items-center gap-6 whitespace-nowrap">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2
                    text-sm text-white/80 hover:text-white transition"
                  >
                    View Repo
                    <img
                      src="/assets/arrow-up.svg"
                      className="w-4 h-4 opacity-70 group-hover:opacity-100 transition"
                    />
                  </a>
                )}

                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2
                    text-sm text-white/80 hover:text-white transition"
                  >
                    Live Demo
                    <img
                      src="/assets/arrow-up.svg"
                      className="w-4 h-4 opacity-70 group-hover:opacity-100 transition"
                    />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectDetails;
