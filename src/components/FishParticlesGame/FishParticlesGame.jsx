// import React, { useEffect, useRef, useState } from "react";
// import Particles from "@tsparticles/react"; // Correct import
// import { loadSlim } from "@tsparticles/slim"; // Corrected slim import
// import { gsap } from "gsap";
// import { Howl } from "howler";
// import "./FishParticlesGame.scss";

// const FishParticlesGame = () => {
//   const fishRef = useRef(null);
//   const [targetPos, setTargetPos] = useState({ x: 100, y: 100 });
//   const [engineLoaded, setEngineLoaded] = useState(false);
//   const bubbleSound = useRef(null); // Store sound instance here

//   // Initialize particles engine using loadSlim
//   const particlesInit = async (engine) => {
//     console.log("Particles Engine Loaded");
//     await loadSlim(engine); // Use the slim version for optimized loading
//     setEngineLoaded(true);
//   };

//   // Initialize sound only after a user gesture
//   const initializeSound = () => {
//     if (!bubbleSound.current) {
//       bubbleSound.current = new Howl({
//         src: ["http://localhost:8080/sounds/bubble_pop_1.mp3"],
//         volume: 0.5,
//         preload: true,
//       });
//     }
//   };

//   const handleClick = (e) => {
//     initializeSound(); // Ensure sound is initialized on first click

//     const rect = e.currentTarget.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;
//     setTargetPos({ x, y });

//     if (bubbleSound.current) {
//       bubbleSound.current.play(); // Play bubble pop sound
//     }
//   };

//   // Use GSAP to smoothly move the fish to the target position
//   useEffect(() => {
//     if (fishRef.current) {
//       gsap.to(fishRef.current, {
//         x: targetPos.x,
//         y: targetPos.y,
//         duration: 1.5,
//         ease: "power2.out",
//       });
//     }
//   }, [targetPos]);

//   // Configuration for the particles (bubbles) effect
//   const particlesOptions = {
//     particles: {
//       number: {
//         value: 150,
//         density: { enable: true, area: 800 },
//       },
//       color: { value: "#AEEEEE" }, // Soft teal bubbles
//       opacity: {
//         value: { min: 0.3, max: 0.8 },
//         animation: { enable: true, speed: 1, sync: false },
//       },
//       size: {
//         value: { min: 2, max: 6 },
//         animation: { enable: true, speed: 2, sync: false },
//       },
//       move: {
//         direction: "top",
//         enable: true,
//         speed: 1.5,
//         outModes: { default: "out" },
//         random: true,
//         straight: false,
//       },
//       shape: {
//         type: "circle",
//       },
//     },
//     interactivity: {
//       events: {
//         onHover: { enable: true, mode: "repulse" },
//         onClick: { enable: true, mode: "push" },
//       },
//       modes: {
//         repulse: { distance: 100, duration: 0.4 },
//         push: { quantity: 4 },
//       },
//     },
//   };

//   return (
//     <div className="sunlit-ocean" onClick={handleClick}>
//       {engineLoaded && (
//         <Particles id="tsparticles" init={particlesInit} options={particlesOptions} />
//       )}
//       <div className="swimming-fish" ref={fishRef}>
//         🐟
//       </div>
//     </div>
//   );
// };

// export default FishParticlesGame;



import React, { useEffect, useRef, useState } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { gsap } from "gsap";
import { Howl } from "howler";
import "./FishParticlesGame.scss";

const FishParticlesGame = ({className}) => {
  const fishRef = useRef(null);
  const [targetPos, setTargetPos] = useState({ x: 100, y: 100 });
  const [engineLoaded, setEngineLoaded] = useState(false);
  const bubbleSound = useRef(null); // Use ref to store sound

  const particlesInit = async (engine) => {
    await loadSlim(engine); // Load tsparticles slim engine
    setEngineLoaded(true);
  };

  const initializeSound = () => {
    if (!bubbleSound.current) {
      bubbleSound.current = new Howl({
        src: ["http://localhost:8080/sounds/bubble_pop_1.mp3"],
        volume: 0.5,
      });
    }
  };

  const handleClick = (e) => {
    initializeSound(); // Ensure sound is initialized after a click
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setTargetPos({ x, y });

    if (bubbleSound.current) {
      bubbleSound.current.play(); // Play sound on click
    }
  };

  useEffect(() => {
    gsap.to(fishRef.current, {
      x: targetPos.x,
      y: targetPos.y,
      duration: 1.5,
      ease: "power2.out",
    });
  }, [targetPos]);

  const particlesOptions = {
    particles: {
      number: { value: 100, density: { enable: true, area: 800 } },
      color: { value: "#00FFFF" },
      size: { value: { min: 2, max: 6 }, animation: { enable: true } },
      move: {
        direction: "top",
        enable: true,
        speed: 1.5,
        outModes: { default: "out" },
      },
    },
  };

  return (
    <div className={`${className} sunlit-ocean`} onClick={handleClick}>
      {engineLoaded && (
        <Particles id="tsparticles" init={particlesInit} options={particlesOptions} />
      )}
      <div className="swimming-fish" ref={fishRef}>
        🐟
      </div>
    </div>
  );
};

export default FishParticlesGame;