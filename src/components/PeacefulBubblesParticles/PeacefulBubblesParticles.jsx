import { useCallback, useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const PeacefulBubblesParticles = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = useCallback((container) => {
    console.log("Particles loaded:", container);
  }, []);

  return (
    init && (
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: "rgba(0, 150, 255, 0.05)",
            },
          },
          particles: {
            number: {
              value: 40,
              density: {
                enable: true,
                area: 800,
              },
            },
            color: {
              value: "#ccefff", // Soft, airy bubble color
            },
            shape: {
              type: "circle",
            },
            opacity: {
              value: { min: 0.2, max: 0.6 }, // Bubble transparency
              animation: {
                enable: true,
                speed: 0.8,
                minimumValue: 0.1,
                sync: false,
              },
            },
            size: {
              value: { min: 5, max: 20 }, // Bubble size range
              animation: {
                enable: true,
                speed: 5,
                minimumValue: 10,
                sync: false,
              },
            },
            move: {
              enable: true,
              speed: 1.5,
              direction: "top",
              random: true,
              outModes: {
                default: "out",
              },
            },
          },
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: "bubble",
              },
              resize: true,
            },
            modes: {
              bubble: {
                distance: 250,
                size: 10,
                duration: 2,
                opacity: 0.8,
              },
            },
          },
          detectRetina: true,
        }}
      />
    )
  );
};

export default PeacefulBubblesParticles;

/******************* Default cool stary setting **************************
******************* Note:  Keep for stary sky other setting *************/

// import { useCallback, useEffect, useState } from "react";
// import Particles, { initParticlesEngine } from "@tsparticles/react";
// import { loadSlim } from "@tsparticles/slim";

// const PeacefulBubblesParticles = () => {
//   const [init, setInit] = useState(false);

//   useEffect(() => {
//     initParticlesEngine(async (engine) => {
//       await loadSlim(engine);
//     }).then(() => {
//       setInit(true);
//     });
//   }, []);

//   const particlesLoaded = useCallback((container) => {
//     console.log("Particles loaded", container);
//   }, []);

//   return (
//     <>
//       {init && (
//         <Particles
//           id="tsparticles"
//           particlesLoaded={particlesLoaded}
//           options={{
//             background: {
//               color: {
//                 value: "#0d47a1",
//               },
//             },
//             fpsLimit: 120,
//             interactivity: {
//               events: {
//                 onClick: { enable: true, mode: "push" },
//                 onHover: { enable: true, mode: "repulse" },
//                 resize: true,
//               },
//               modes: {
//                 push: { quantity: 4 },
//                 repulse: { distance: 200, duration: 0.4 },
//               },
//             },
//             particles: {
//               color: { value: "#ffffff" },
//               links: {
//                 color: "#ffffff",
//                 distance: 150,
//                 enable: true,
//                 opacity: 0.5,
//                 width: 1,
//               },
//               move: {
//                 enable: true,
//                 speed: 6,
//                 direction: "none",
//                 outModes: { default: "bounce" },
//               },
//               number: {
//                 value: 80,
//                 density: { enable: true, area: 800 },
//               },
//               opacity: { value: 0.5 },
//               shape: { type: "circle" },
//               size: { value: { min: 1, max: 5 } },
//             },
//             detectRetina: true,
//           }}
//         />
//       )}
//     </>
//   );
// };

// export default PeacefulBubblesParticles;
