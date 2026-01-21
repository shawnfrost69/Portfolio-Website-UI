"use client";
import { useScroll, useTransform, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

export const Timeline = ({ data }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [data]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <section className="c-space section-spacing" ref={containerRef}>
      <h2 className="text-heading">My Work Experience</h2>

      <div ref={ref} className="relative pb-20 mx-auto">
        {data.map((item, index) => (
          <div
            key={item.id ?? index}
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
          >
            {/* LEFT STICKY COLUMN */}
            <div className="sticky z-40 top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="absolute -left-[15px] h-10 w-10 rounded-full bg-midnight flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-neutral-800 border border-neutral-700" />
              </div>

              {/* Desktop */}
              <div className="hidden md:flex flex-col gap-2 pl-20">
                <h3 className="text-xl font-semibold text-neutral-500">
                  {item.duration}
                </h3>
                <h3 className="text-3xl font-bold text-neutral-300">
                  {item.company}
                </h3>
                <h3 className="text-xl text-neutral-400">{item.role}</h3>
              </div>
            </div>

            {/* RIGHT CONTENT */}
            <div className="relative w-full pl-20 pr-4 md:pl-4">
              {/* Mobile */}
              <div className="md:hidden mb-4">
                <h3 className="text-sm text-neutral-500">{item.duration}</h3>
                <h3 className="text-lg font-semibold text-neutral-300">
                  {item.company}
                </h3>
                <h3 className="text-sm text-neutral-400">{item.role}</h3>
              </div>

              {/* Highlights */}
              {item.highlights?.map((point, i) => (
                <p key={i} className="mb-3 text-sm leading-6 text-neutral-400">
                  • {point}
                </p>
              ))}
            </div>
          </div>
        ))}

        {/* TIMELINE LINE */}
        <div
          style={{ height }}
          className="absolute left-1 top-0 w-[2px]
          bg-gradient-to-b from-transparent via-neutral-700 to-transparent
          [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px]
            bg-gradient-to-t from-green-500 via-lavender/50 to-transparent
            rounded-full"
          />
        </div>
      </div>
    </section>
  );
};
