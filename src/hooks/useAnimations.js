import { useEffect } from "react";
import { gsap } from "gsap";

export const useAnimations = (elementRef, animationConfig) => {
  useEffect(() => {
    if (elementRef.current) {
      gsap.to(elementRef.current, animationConfig);
    }
  }, [elementRef, animationConfig]);
};
