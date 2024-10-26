import React, { useState, useRef, useEffect } from "react";
import { Howl } from "howler";
import { gsap } from "gsap";
import "./FishBubbleGame.scss";

const FishBubbleGame = ({ className }) => {
  const fishRef = useRef(null);
  const gameAreaRef = useRef(null);
  const [fishPos, setFishPos] = useState({ x: 100, y: 100 });
  const [targetPos, setTargetPos] = useState({ x: 100, y: 100 });
  const [bubbles, setBubbles] = useState([]);
  const [bubbleSound, setBubbleSound] = useState(null);

  const getRandomX = () => Math.random() * gameAreaRef.current.offsetWidth;

  const initializeSound = () => {
    if (!bubbleSound) {
      const sound = new Howl({
        src: ["http://localhost:8080/sounds/bubble_pop_1.mp3"],
        volume: 0.5,
        preload: true,
      });
      setBubbleSound(sound);
    }
  };

  useEffect(() => {
    const bubbleInterval = setInterval(() => {
      setBubbles((prev) => [
        ...prev,
        {
          id: Math.random(),
          x: getRandomX(),
          y: gameAreaRef.current.offsetHeight,
        },
      ]);
    }, 2000);

    return () => clearInterval(bubbleInterval);
  }, []);

  useEffect(() => {
    const bubbleMove = setInterval(() => {
      setBubbles((prev) =>
        prev
          .map((bubble) => ({ ...bubble, y: bubble.y - 5 }))
          .filter((bubble) => bubble.y > -50)
      );
    }, 100);

    return () => clearInterval(bubbleMove);
  }, []);

  useEffect(() => {
    const moveFish = () => {
      const dx = targetPos.x - fishPos.x;
      const dy = targetPos.y - fishPos.y;
      const distance = Math.hypot(dx, dy);

      if (distance < 5) return;

      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      const newX = fishPos.x + Math.cos((angle * Math.PI) / 180) * 4;
      const newY = fishPos.y + Math.sin((angle * Math.PI) / 180) * 4;

      setFishPos({ x: newX, y: newY });

      const isMovingRight = dx > 0;
      gsap.to(fishRef.current, {
        rotation: isMovingRight ? angle : angle + 180,
        scaleX: isMovingRight ? -1 : 1,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    const animation = requestAnimationFrame(moveFish);
    return () => cancelAnimationFrame(animation);
  }, [targetPos, fishPos]);

  const handleClick = (e) => {
    initializeSound();
    const rect = gameAreaRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setTargetPos({ x, y });
  };

  const isColliding = (fish, bubble) => {
    const fishRect = fish.getBoundingClientRect();
    const bubbleRect = bubble.getBoundingClientRect();

    return !(
      fishRect.top > bubbleRect.bottom ||
      fishRect.bottom < bubbleRect.top ||
      fishRect.left > bubbleRect.right ||
      fishRect.right < bubbleRect.left
    );
  };

  useEffect(() => {
    bubbles.forEach((bubble) => {
      const bubbleElement = document.querySelector(`[data-id="${bubble.id}"]`);

      if (
        bubbleElement &&
        fishRef.current &&
        isColliding(fishRef.current, bubbleElement)
      ) {
        if (bubbleSound && !bubbleSound.playing()) {
          bubbleSound.play();
        }
        setBubbles((prev) => prev.filter((b) => b.id !== bubble.id)); // Remove bubble
      }
    });
  }, [fishPos, bubbles, bubbleSound]);

  return (
    <div
      className={`${className} game-area`}
      ref={gameAreaRef}
      onClick={handleClick}
    >
      <div
        className="fish"
        ref={fishRef}
        style={{ left: `${fishPos.x}px`, top: `${fishPos.y}px` }}
      >
        🐟
      </div>
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          data-id={bubble.id}
          className="bubble"
          style={{ left: `${bubble.x}px`, top: `${bubble.y}px` }}
        />
      ))}
    </div>
  );
};

export default FishBubbleGame;
