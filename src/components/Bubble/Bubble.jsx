import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import "./Bubble.scss";

function Bubble({ x, y, onRemove }) {
  const bubbleRef = useRef(null);

  useEffect(() => {
    console.log(`Bubble at X: ${x}, Y: ${y}`);
    if (bubbleRef.current) {
      const speed = Math.random() * 3 + 4;

      gsap.set(bubbleRef.current, {
        left: `${x}px`,
        top: `100%`,
        scale: 0.5,
        opacity: 0.8,
      });

      gsap.to(bubbleRef.current, {
        top: "50px",
        opacity: 0,
        scale: Math.random() * 0.5 + 1.2,
        duration: speed,
        ease: "power2.out",
        onComplete: onRemove,
      });
    }
  }, [x, y, onRemove]);

  return <div ref={bubbleRef} className="bubble" />;
}

export default Bubble;

