import React, { useRef } from "react";
import Card from "../components/Card";
import { Globe } from "../components/Globe";
import CopyEmailButton from "../components/CopyEmailButton";
import { Frameworks } from "../components/Frameworks";
import { useScrollReveal } from "../hooks/useScrollReveal";

const About = () => {
  const grid2Container = useRef();
  const [sectionRef, isVisible] = useScrollReveal({
    threshold: 0.1,
    once: true,
  });

  const securityStack = [
    "Nmap",
    "Burp Suite",
    "Wireshark",
    "ElasticSearch",
    "Metasploitable",
    "Linux",
    "Wireless Security",
  ];

  return (
    <section id="about" className="c-space section-spacing">
      <h2 className="text-heading">About Me</h2>

      <div
        ref={sectionRef}
        className={`grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[18rem] mt-12 scroll-reveal ${
          isVisible ? "visible" : ""
        }`}
      >
        {/* ───────────────── GRID 1 (Intro + Email CTA) ───────────────── */}
        <div className="flex items-end grid-default-color grid-1">
          <img
            src="/assets/coding-pov.png"
            className="absolute scale-[1.75] -right-[5rem] -top-[1rem]
                       md:scale-[3] md:left-50 md:inset-y-10 lg:scale-[2.5]"
          />

          <div className="z-10">
            <p className="headtext">Hi I'm Akash Verma</p>
            <p className="subtext">
              Over the last 3 years, I’ve built secure, scalable frontend and
              backend systems—focusing not just on functionality, but on
              protecting data, users, and infrastructure.
            </p>
            <div className="mt-4">
              <CopyEmailButton />
            </div>
          </div>

          <div
            className="absolute inset-x-0 pointer-events-none
                       -bottom-4 h-1/2 sm:h-1/3 bg-gradient-to-t from-indigo"
          />
        </div>

        {/* ───────────────── GRID 2 (Floating Cards) ───────────────── */}
        <div className="grid-default-color grid-2">
          <div
            ref={grid2Container}
            className="flex items-center justify-center w-full h-full"
          >
            <p className="flex items-end text-5xl text-gray-500">
              VX CODE CRAFT
            </p>

            <Card
              style={{ rotate: "75deg", top: "30%", left: "20%" }}
              text="OOPs"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "-30deg", top: "60%", left: "45%" }}
              text="Sql Server"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "90deg", bottom: "30%", left: "75%" }}
              text="Solid Principals"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "-45deg", top: "55%", left: "0%" }}
              text="Design Principles"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "20deg", top: "10%", left: "38%" }}
              text="Data Structure"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "0deg", top: "5%", left: "68%" }}
              text="Algorithms"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "30deg", top: "70%", left: "70%" }}
              image="/assets/logos/csharp-pink.png"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "-45deg", top: "70%", left: "25%" }}
              image="/assets/logos/dotnet-pink.png"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "-45deg", top: "5%", left: "10%" }}
              image="/assets/logos/blazor-pink.png"
              containerRef={grid2Container}
            />
          </div>
        </div>

        {/* ───────────────── GRID 3 (Time Zone) ───────────────── */}
        <div className="grid-black-color grid-3">
          <div className="z-10 w-[50%]">
            <p className="headtext">Time Zone</p>
            <p className="subtext">
              Based in India, open to global and remote opportunities.
            </p>
          </div>

          <figure className="absolute left-[30%] top-[10%]">
            <Globe />
          </figure>
        </div>

        <div className="grid-black-color md:col-span-3">
          <div className="z-10">
            <p className="headtext">Security Skills</p>
            <p className="subtext mb-4">
              Tools and platforms I use for penetration testing, network
              analysis, and security research.
            </p>

            <div className="flex flex-wrap gap-3">
              {securityStack.map((tool) => (
                <span
                  key={tool}
                  className="px-3 py-1.5 text-xs rounded-full
                             bg-white/10 border border-white/10
                             text-neutral-300 hover:bg-white/20 transition"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
        {/* ───────────────── GRID 5 (Tech Stack – slightly smaller) ───────────────── */}
        <div className="relative grid-default-color md:col-span-3 overflow-hidden">
          <div className="z-10 w-[55%]">
            <p className="headtext">Tech Stack</p>
            <p className="subtext">
              Languages, frameworks, and tools I use to build scalable
              applications.
            </p>
          </div>

          <div
            className="absolute inset-y-0 md:inset-y-9 
            w-full h-full start-[50%] md:scale-125"
          >
            <Frameworks />
          </div>
        </div>

        {/* ───────────────── GRID 6 (Security Skills – RIGHT SIDE) ───────────────── */}
      </div>
    </section>
  );
};

export default About;
