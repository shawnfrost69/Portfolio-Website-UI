import React from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Project";
import Experience from "./sections/Experience";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import Certifications from "./sections/Certifications";

const App = () => {
  return (
    <>
      {/* ✅ Full-width sections */}
      <Navbar />
      <Hero />

      {/* ✅ Boxed content */}
      <div className="mx-auto max-w-7xl">
        <About />
        <Projects />
        <Experience />
        <Certifications />
        <Contact />
        <Footer />
      </div>
    </>
  );
};

export default App;
