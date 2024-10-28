import { useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import "./FireFish.scss";

gsap.registerPlugin(MotionPathPlugin);

function FireFish({ index, letter, onLetterCaught, bucketPosition }) {
  const fishRef = useRef(null);
  const isCaughtRef = useRef(false);
  const timeline = useRef(null);
  const fireRef = useRef(null);

  const createFishPath = (index) => [
    { x: bucketPosition.x - 100, y: index * -100 - 190 },
    { x: bucketPosition.x - 100, y: index * -100 - 100 },
  ];

  const getRandomSpeed = () => Math.random() * 5 + 5;

  useEffect(() => {
    if (fishRef.current && !isCaughtRef.current) {
      const fishAnimation = gsap.fromTo(
        fishRef.current,
        { x: -100 },
        {
          x: window.innerWidth + 100,
          duration: getRandomSpeed(),
          ease: "linear",
          repeat: -1,
          onRepeat: () => gsap.set(fishRef.current, { x: -100 }),
        }
      );

      return () => fishAnimation.kill();
    }
  }, []);

  useEffect(() => {
    const y = -95 - 100 * index;
    if (fishRef.current) {
      timeline.current = gsap.timeline({ paused: true });

      timeline.current
        .set(fireRef.current, { display: "block" })
        .to(fishRef.current, {
          rotation: 15,
          yoyo: true,
          repeat: 3,
          duration: 0.2,
          ease: "sine.inOut",
        });

      timeline.current.to(fishRef.current, {
        rotation: -90,
        duration: 0.2,
        ease: "sine.inOut",
      });

      timeline.current.to(fishRef.current, {
        motionPath: {
          path: createFishPath(index),
          autoRotate: true,
          duration: 2,
          ease: "power1.inOut",
        },
      });

      timeline.current.to(fishRef.current, {
        x: bucketPosition.x - 120,
        y: y,
        scale: 0,
        opacity: 0,
        duration: 0.5,
        onComplete: onLetterCaught,
      });
    }
  }, [onLetterCaught]);

  const handleKeyPress = useCallback(
    (event) => {
      if (
        event.key.toLowerCase() === letter.toLowerCase() &&
        fishRef.current &&
        !isCaughtRef.current
      ) {
        console.log("Correct key pressed!");
        isCaughtRef.current = true;
        timeline.current.play();
      }
    },
    [letter]
  );

  useEffect(() => {
    window.addEventListener("keypress", handleKeyPress);
    return () => window.removeEventListener("keypress", handleKeyPress);
  }, [handleKeyPress]);

  return (
    <div ref={fishRef} className="fish-game">
      <div className="fish">
        <span className="fish__icon">🐟</span>
        <span className="letter">{letter}</span>
      </div>
      <div ref={fireRef} className="fire-effect">
        🔥
      </div>
    </div>
  );
}

export default FireFish;
