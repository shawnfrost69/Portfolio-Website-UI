import { useEffect, useState } from "react";
import CertificationsTimeline from "../components/CertificationsTimeline";
import { useScrollReveal } from "../hooks/useScrollReveal";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const Certifications = () => {
  const [certifications, setCertifications] = useState([]);
  const [sectionRef, isVisible] = useScrollReveal({
    threshold: 0.1,
    once: true,
  });

  useEffect(() => {
    fetch(`${API_BASE}/api/Certifications`)
      .then((res) => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then(setCertifications)
      .catch((err) => console.error("Failed to load certifications", err));
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
