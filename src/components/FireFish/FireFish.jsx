import { useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import "./FireFish.scss";

function FireFish({ index, letter, onLetterCaught }) {
  const fishRef = useRef(null);
  const isCaughtRef = useRef(false);
  const timeline = useRef(null);
  const fireRef = useRef(null); // Reference for the fire effect

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
    const y = -90 - 100 * index;
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
        x: window.innerWidth * 0.60 - 50,
        y: y,
        scale: 0.5,
        duration: 1.5,
        ease: "power2.out",
        onComplete: () => {
          gsap.set(fishRef.current, { display: "none" });
          onLetterCaught();
        },
      });

      // timeline.current.to(fishRef.current, {
      //   opacity: 0,
      //   scale: 0.1,
      //   duration: 1,
      //   ease: "power2.out",
      //   onComplete: onLetterCaught,
      // });
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
