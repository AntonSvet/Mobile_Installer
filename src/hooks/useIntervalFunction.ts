import { useEffect } from "react";

export const useIntervalFunction = (callback: () => void, interval: number, condition: boolean) => {
  useEffect(() => {
    const i = setInterval(() => callback(), interval);
    if (!condition) {
      clearInterval(i);
    }
    return () => {
      clearInterval(i);
    };
  }, [condition]);
};
