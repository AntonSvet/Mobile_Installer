import "./imageLoader.css";

interface ImageLoaderProps {
  progress?: number;
  title: string;
}

const ImageLoader = ({ progress, title }: ImageLoaderProps) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="loader-container">
          <div className="loader"></div>
          <div className="loader-text">{Math.round(progress || 0)}%</div>
        </div>
        <div>{title}</div>
        <div>Пожалуйста, подождите...</div>
      </div>
    </div>
  );
};

export default ImageLoader;
