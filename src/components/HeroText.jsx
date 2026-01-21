import React from "react";
import { FlipWords } from "./FlipWords";
import { motion } from "motion/react";

const HeroText = () => {
  const words = ["Secure", "Scalable", "Resilient"];

  const variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div
      className="
        z-10 mt-20
        text-center md:mt-40 md:text-left
        rounded-3xl bg-clip-text
      "
    >
      {/* ───────────── DESKTOP ───────────── */}
      <div className="hidden md:flex flex-col c-space">
        <motion.h1
          className="text-3xl font-medium"
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1 }}
        >
          Hi, I'm Akash Verma
        </motion.h1>

        <motion.p
          className="mt-2 text-5xl font-medium text-neutral-300"
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.2 }}
        >
          Engineering <br />
          Software That Is
        </motion.p>

        <motion.div
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.5 }}
        >
          <FlipWords words={words} className="font-black text-white text-8xl" />
        </motion.div>

        <motion.p
          className="mt-2 text-4xl font-medium text-neutral-300 max-w-xl"
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.8 }}
        >
          with a security-first approach
        </motion.p>
      </div>

      {/* ───────────── MOBILE ───────────── */}
      <div className="flex flex-col space-y-5 md:hidden">
        <motion.p
          className="text-4xl font-medium"
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1 }}
        >
          Hi, I'm Akash Verma
        </motion.p>

        <motion.p
          className="text-4xl font-black text-neutral-300"
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.2 }}
        >
          Engineering
        </motion.p>

        <motion.div
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.5 }}
        >
          <FlipWords words={words} className="font-bold text-white text-7xl" />
        </motion.div>

        <motion.p
          className="text-3xl font-medium text-neutral-300"
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.8 }}
        >
          software with a <br />
          security-first approach
        </motion.p>
      </div>
    </div>
  );
};

export default HeroText;
