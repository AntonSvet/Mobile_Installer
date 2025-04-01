import { useRef } from "react";
import "./logoCube.css";
import { useTheme } from "../../hooks/useTheme";
const LogoCube = () => {
  const cubeRef = useRef<HTMLDivElement>(null);
  const { toggleTheme } = useTheme();
  const handleClick = () => {
    const cube = cubeRef.current;
    if (cube) {
      // Увеличиваем скорость вращения (уменьшаем длительность анимации)

      cube.style.animationDuration = "0.5s";

      // Возвращаем исходную скорость через 2 секунды
      setTimeout(() => {
        toggleTheme();
        cube.style.animationDuration = "7s";
      }, 500);
    }
  };
  return (
    <div ref={cubeRef} onClick={handleClick} className="cube">
      <div className="face back"></div>
      <div className="face front"></div>
      <div className="face left"></div>
      <div className="face right"></div>
      <div className="face top"></div>
      <div className="face bottom"></div>
    </div>
  );
};

export default LogoCube;
