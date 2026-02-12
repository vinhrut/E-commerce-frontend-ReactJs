import { useEffect, useRef, useState } from "react";

const useTranslateXImage = () => {
  const [scrollDirection, setScrollDirection] = useState(null);
  const previousScroll = useRef(0);
  const [translateXPosition, setTranslateXPosition] = useState(40);
  const [scrollPosition, setScrollPosition] = useState(0);

  const scrollTracking = () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > previousScroll.current) {
      setScrollDirection("down");
    } else if (currentScroll < previousScroll.current) {
      setScrollDirection("up");
    }

    previousScroll.current = currentScroll <= 0 ? 0 : currentScroll;
    setScrollPosition(currentScroll);
  };

  const handleTranslateXPosition = () => {
    if (scrollDirection === "down" && scrollPosition >= 1650) {
      setTranslateXPosition(
        translateXPosition < 30 ? 0 : translateXPosition - 10
      );
    } else if (scrollDirection === "up" && scrollPosition < 2850) {
      setTranslateXPosition(
        translateXPosition >= 150 ? 150 : translateXPosition + 10
      );
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollTracking);
    return () => {
      window.removeEventListener("scroll", scrollTracking);
    };
  });

  useEffect(() => {
    handleTranslateXPosition();
  }, [scrollPosition]);

  return {
    translateXPosition,
  };
};

export default useTranslateXImage;
