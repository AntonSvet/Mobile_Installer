import { useState, useEffect } from "react";

const useImageLoader = (images : NodeListOf<HTMLImageElement>) => {
  const [progress, setProgress] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let loadedCount = 0;

    const handleImageLoad = () => {
      loadedCount++;
      const newProgress = (loadedCount / images.length) * 100;
      setProgress(newProgress);
      if (loadedCount === images.length) {
        setIsLoading(false); // Все изображения загружены
      }
    };

    images.forEach((img) => {
      if (img.complete) {
        // Если изображение уже загружено
        handleImageLoad();
      } else {
        // Отслеживаем загрузку изображения
        img.addEventListener("load", handleImageLoad);
      }
    });

    // Очистка событий при размонтировании компонента
    return () => {
      images.forEach((img) => {
        img.removeEventListener("load", handleImageLoad);
      });
    };
  }, [images]);

  return { progress, isLoading };
};

export default useImageLoader;
