import { useState, useEffect } from "react";


/*  Get Viewport Width */
export const useViewportWidth = (): number => {
  const [width, setWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return width;
};

