import { useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import "./FireFish.scss";

function FireFish({ letter, onLetterCaught }) {
  const fishRef = useRef(null);
  const isCaughtRef = useRef(false);
  const timeline = useRef(null);

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
    if (fishRef.current) {
      timeline.current = gsap.timeline({ paused: true });

      timeline.current.to(fishRef.current, {
        rotation: 15,
        yoyo: true,
        repeat: 3,
        duration: 0.2,
        ease: "sine.inOut",
      });

      timeline.current.to(fishRef.current, {
        opacity: 0,
        scale: 0.1,
        duration: 1,
        ease: "power2.out",
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
    </div>
  );
}

export default FireFish;
