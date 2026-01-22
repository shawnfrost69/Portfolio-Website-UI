import { Canvas, useFrame } from "@react-three/fiber";
import HeroText from "../components/HeroText";
import ParrallaxBackground from "../components/ParrallaxBackground";
import { Astronaut } from "../components/Astronaut";
import { Float } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { easing } from "maath";
import { Suspense } from "react";
import Loader from "../components/Loader";

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });

  return (
    <section
      id="home"
      className="
        relative flex min-h-screen overflow-hidden
        items-start justify-center md:justify-start
        c-space
      "
    >
      {/* 🌌 Parallax Background */}
      <ParrallaxBackground />

      <HeroText />

      {/* 🧑‍🚀 Astronaut Canvas */}
      <figure className="absolute inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 1, 3] }}>
          <Suspense fallback={<Loader />}>
            <Float>
              <Astronaut
                scale={isMobile ? 0.23 : 0.28}
                position={isMobile ? [0.4, -1.5, 0] : [1.6, -1.2, 0]}
              />
            </Float>
            <Rig />
          </Suspense>
        </Canvas>
      </figure>
    </section>
  );
};

function Rig() {
  return useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [state.mouse.x / 12, 1 + state.mouse.y / 12, 3],
      0.5,
      delta,
    );
  });
}

export default Hero;
