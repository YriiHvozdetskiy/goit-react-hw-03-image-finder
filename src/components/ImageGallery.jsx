import { ImageGalleryItem } from './ImageGalleryItem';

export const ImageGallery = ({ value }) => {
  return (
    <>
      <ul className="ImageGallery">
        <ImageGalleryItem value={value} />
      </ul>
    </>
  );
};
