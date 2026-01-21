import { useEffect, useState } from "react";
import Projects from "../components/Projects";
import ProjectModal from "../components/ProjectDetails";
import { useScrollReveal } from "../hooks/useScrollReveal";

const VISIBLE_COUNT = 3;

const Project = () => {
  const [projects, setProjects] = useState([]);

  // 🔥 ONE SOURCE OF TRUTH
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  // 👇 show more toggle
  const [showAll, setShowAll] = useState(false);

  const [sectionRef, isVisible] = useScrollReveal({
    threshold: 0.1,
    once: true,
  });

  // 🔹 LIST
  useEffect(() => {
    fetch("http://localhost:5137/api/Projects")
      .then((res) => res.json())
      .then(setProjects);
  }, []);

  // 🔹 DETAILS (READ MORE)
  useEffect(() => {
    if (!selectedProjectId) return;

    fetch(`http://localhost:5137/api/Projects/${selectedProjectId}`)
      .then((res) => res.json())
      .then(setSelectedProject);
  }, [selectedProjectId]);

  // 🔹 CLOSE HANDLER
  const closeModal = () => {
    setSelectedProject(null);
    setSelectedProjectId(null);
  };

  // 👇 slice logic
  const visibleProjects = showAll ? projects : projects.slice(0, VISIBLE_COUNT);

  return (
    <section id="projects" className="relative c-space section-spacing">
      <h2 className="text-heading">My Projects</h2>

      <div
        ref={sectionRef}
        className={`mt-12 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-700 to-transparent ${
          isVisible ? "visible" : ""
        }`}
      />

      {/* 🔥 PROJECT LIST */}
      {visibleProjects.map((p) => (
        <Projects
          key={p.id}
          {...p}
          setSelectedProjectId={setSelectedProjectId}
        />
      ))}

      {/* 🔽 CHECK MORE BUTTON */}
      {projects.length > VISIBLE_COUNT && (
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="group inline-flex items-center gap-2
            px-6 py-2 rounded-full
            border border-white/15
            text-sm text-white/80
            hover:text-white hover:border-white/30
            transition"
          >
            {showAll ? "Show Less" : "Check More"}
            <img
              src="/assets/arrow-up.svg"
              className={`w-4 h-4 transition-transform ${
                showAll ? "rotate-180" : ""
              }`}
              alt="toggle"
            />
          </button>
        </div>
      )}

      {/* 🔥 MODAL */}
      {selectedProject && (
        <ProjectModal project={selectedProject} closeModal={closeModal} />
      )}
    </section>
  );
};

export default Project;
