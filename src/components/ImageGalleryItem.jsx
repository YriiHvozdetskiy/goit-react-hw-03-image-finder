export const ImageGalleryItem = ({ value }) => {
  return (
    <>
      {value.map(img => {
        return (
          <li key={img.id} className="ImageGalleryItem">
            <img
              src={img.webformatURL}
              alt={img.tags}
              className="ImageGalleryItem-image"
            />
          </li>
        );
      })}
    </>
  );
};

// largeImageURL;
// webformatURL;
// id;
