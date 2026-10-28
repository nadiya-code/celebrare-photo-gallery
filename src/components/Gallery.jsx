import PhotoCard from "./PhotoCard";

function Gallery({ photos, favourites, onToggleFavourite }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {photos.map((photo) => {
        const isFavourite = favourites.some((item) => item.id === photo.id);

        return (
          <PhotoCard
            key={photo.id}
            photo={photo}
            isFavourite={isFavourite}
            onToggleFavourite={onToggleFavourite}
          />
        );
      })}
    </div>
  );
}

export default Gallery;
