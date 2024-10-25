import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import "./FireFish.scss";

function FireFish({ letter, onLetterCaught }) {
  const fishRef = useRef(null);
  const [isCaught, setIsCaught] = useState(false);

  const getRandomSpeed = () => Math.random() * 5 + 5;

  useEffect(() => {
    const animateFish = () => {
      if (!isCaught) {
        const tl = gsap.timeline({ repeat: -1 });

        tl.to(fishRef.current, {
          x: window.innerWidth + 100,
          duration: getRandomSpeed(),
          ease: "linear",
          conComplete: () => {
            gsap.set(fishRef.current, { x: -100 });
          },
        });
      }
    };

    animateFish();
  }, [isCaught]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key.toLowerCase() === letter.toLowerCase()) {
        setIsCaught(true);
        gsap.to(fishRef.current, {
          opacity: 0,
          scale: 0,
          duration: 1,
          onComplete: onLetterCaught,
        });
      }
    };

    window.addEventListener("keypress", handleKeyPress);

    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, [letter, onLetterCaught]);

  return (
    !isCaught && (
      <div ref={fishRef} className="fish-game">
        <div className="fish">
          <span className="fish__icon">🐟</span>
          <span className="letter">{letter}</span>
        </div>
      </div>
    )
  );
}

export default FireFish;
