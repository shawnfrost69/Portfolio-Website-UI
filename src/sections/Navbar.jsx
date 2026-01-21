import { useState } from "react";
import { motion } from "motion/react";

const RESUME_URL = "/assets/AKASH_VERMA_RESUME.pdf";

function Navigation({ onItemClick }) {
  return (
    <ul className="flex items-center gap-8">
      {[
        { label: "Home", href: "#home" },
        { label: "About", href: "#about" },
        { label: "Projects", href: "#projects" },
        { label: "Work", href: "#work" },
        { label: "Contact", href: "#contact" },
      ].map((item) => (
        <li key={item.label}>
          <a
            href={item.href}
            onClick={onItemClick}
            className="nav-link text-neutral-400 hover:text-white transition"
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed inset-x-0 z-20 backdrop-blur-lg bg-primary/40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative flex items-center h-14">
          {/* LEFT — LOGO */}
          <a
            href="/"
            className="absolute left-0 text-xl font-bold text-neutral-400 hover:text-white"
          >
            AV
          </a>

          {/* CENTER — NAV (DESKTOP) */}
          <nav className="hidden sm:flex mx-auto">
            <Navigation />
          </nav>

          {/* RIGHT — RESUME + MOBILE TOGGLE */}
          <div className="absolute right-0 flex items-center gap-4">
            {/* RESUME DOWNLOAD */}
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              title="Download Resume"
              className="hidden sm:flex items-center justify-center
                         w-9 h-9 rounded-lg
                         border border-white/10
                         bg-gray/20 hover:bg-white/10
                         transition"
            >
              <img
                src="/assets/download.png"
                alt="Download Resume"
                className="w-5 h-5 text-white opacity-80"
              />
            </a>

            {/* MOBILE MENU TOGGLE */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="sm:hidden text-neutral-400 hover:text-white"
            >
              <img
                src={isOpen ? "/assets/close.svg" : "/assets/menu.svg"}
                className="w-6 h-6"
                alt="toggle"
              />
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <motion.div
          className="sm:hidden bg-primary/60 backdrop-blur-lg"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <nav className="py-6 flex flex-col items-center gap-6">
            <Navigation onItemClick={() => setIsOpen(false)} />

            {/* MOBILE RESUME BUTTON */}
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2
                         text-sm text-neutral-300 hover:text-white"
            >
              Download Resume
              <img src="/assets/download.svg" className="w-4 h-4 opacity-80" />
            </a>
          </nav>
        </motion.div>
      )}
    </div>
  );
};

export default Navbar;
