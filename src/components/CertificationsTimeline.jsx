"use client";
import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

const pair = (arr) => {
  const out = [];
  for (let i = 0; i < arr.length; i += 2) {
    out.push(arr.slice(i, i + 2));
  }
  return out;
};

const CertificationsTimeline = ({ data }) => {
  const containerRef = useRef(null);
  const lineRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (lineRef.current) {
      setHeight(lineRef.current.getBoundingClientRect().height);
    }
  }, [data]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 60%"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], [0, height]);
  const lineOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  const rows = pair(data);

  return (
    <section ref={containerRef} className="c-space section-spacing">
      <h2 className="text-heading mb-16">Certifications</h2>

      <div ref={lineRef} className="relative">
        {/* Vertical Line */}
        <div
          className="absolute left-[22px] top-0 w-[2px]
                     bg-neutral-700/40
                     [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]"
          style={{ height }}
        >
          <motion.div
            style={{ height: lineHeight, opacity: lineOpacity }}
            className="absolute top-0 w-[2px]
                       bg-gradient-to-b
                       from-purple-500 via-cyan-400 to-transparent
                       rounded-full"
          />
        </div>

        {/* Rows */}
        <div className="space-y-28">
          {rows.map((row, i) => (
            <div key={i} className="flex gap-10">
              {/* Timeline Dot */}
              <div className="relative w-[48px] flex justify-center">
                <div className="h-10 w-10 rounded-full bg-midnight flex items-center justify-center">
                  <div className="h-3 w-3 rounded-full bg-neutral-700" />
                </div>
              </div>

              {/* Certification Cards */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                {row.map((cert) => (
                  <div
                    key={cert.id}
                    className="rounded-xl border border-white/10
                               bg-white/5 p-5
                               hover:bg-white/10 transition"
                  >
                    <h3 className="text-lg font-semibold text-white">
                      {cert.title}
                    </h3>

                    <p className="text-sm text-neutral-400 mt-1">
                      {cert.issuer}
                    </p>

                    <p className="text-xs text-neutral-500 mt-1">
                      Issued{" "}
                      {new Date(cert.issuedOn).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}
                      {cert.expiresOn && (
                        <>
                          {" · Expires "}
                          {new Date(cert.expiresOn).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              year: "numeric",
                            },
                          )}
                        </>
                      )}
                    </p>

                    <div className="flex gap-4 mt-4 text-sm">
                      {cert.credentialUrl && (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-400 hover:underline"
                        >
                          View Credential ↗
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsTimeline;
