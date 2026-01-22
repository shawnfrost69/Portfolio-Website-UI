import { useEffect, useState } from "react";
import { Timeline } from "../components/Timeline";
import { useScrollReveal } from "../hooks/useScrollReveal";

const Experience = () => {
  const [sectionRef, isVisible] = useScrollReveal({
    threshold: 0.1,
    once: true,
  });

  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5137/api/Experience")
      .then((res) => res.json())
      .then((data) => {
        setExperiences(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load experience", err);
        setLoading(false);
      });
  }, []);

  return (
    <section ref={sectionRef} id="work" className="w-full">
      <div className={`scroll-reveal-scale ${isVisible ? "visible" : ""}`}>
        {loading ? (
          <p className="text-center text-neutral-400 mt-10">
            Loading experience…
          </p>
        ) : (
          <Timeline data={experiences} />
        )}
      </div>
    </section>
  );
};

export default Experience;
