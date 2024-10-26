import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import "./Bubble.scss";

function Bubble() {
  const bubbleRef = useRef(null);

  useEffect(() => {
    if (bubbleRef.current) {
      const size = Math.random() * 20 + 10;
      const speed = Math.random() * 1.5 + 2;
      const startX = Math.random() * window.innerWidth;

      gsap.set(bubbleRef.current, {
        x: startX,
        y: window.innerHeight + size,
        width: size,
        height: size,
        opacity: 0.8,
      });

      gsap.to(bubbleRef.current, {
        y: -100,
        opacity: 0,
        scale: Math.random() * 0.3 + 0.7,
        duration: speed,
        ease: "power1.out",
        onComplete: () => bubbleRef.current?.remove(),
      });
    }
  }, []);

  return <div ref={bubbleRef} className="bubble" />;
}

export default Bubble;
