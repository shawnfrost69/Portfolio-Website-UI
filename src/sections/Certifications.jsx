import { useEffect, useState } from "react";
import CertificationsTimeline from "../components/CertificationsTimeline";
import { useScrollReveal } from "../hooks/useScrollReveal";

const Certifications = () => {
  const [certifications, setCertifications] = useState([]);
  const [sectionRef, isVisible] = useScrollReveal({
    threshold: 0.1,
    once: true,
  });

  useEffect(() => {
    fetch("http://localhost:5137/api/Certifications")
      .then((res) => res.json())
      .then(setCertifications);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="certifications"
      className={`w-full scroll-reveal-scale ${isVisible ? "visible" : ""}`}
    >
      <CertificationsTimeline data={certifications} />
    </section>
  );
};

export default Certifications;
