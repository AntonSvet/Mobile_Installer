import { useState, useEffect,   RefObject } from "react";

const useResizeObserver = (ref: RefObject<HTMLElement | null>): number => {
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    if (ref.current) {
      // Функция для обновления высоты
      const updateHeight = () => {
        setHeight(ref.current?.offsetHeight || 0);
      };

      // Инициализация ResizeObserver
      const resizeObserver = new ResizeObserver(updateHeight);
      resizeObserver.observe(ref.current);

      // Установить начальную высоту
      updateHeight();

      // Очистка при размонтировании
      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [ref]);

  return height;
};

export default useResizeObserver;
