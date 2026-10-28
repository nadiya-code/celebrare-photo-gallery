import { Heart } from "lucide-react";

function PhotoCard({ photo, isFavourite, onToggleFavourite }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative overflow-hidden bg-gray-100">
        <img
          src={photo.download_url}
          alt={`Photo by ${photo.author}`}
          loading="lazy"
          className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <button
          type="button"
          onClick={() => onToggleFavourite(photo)}
          aria-label={
            isFavourite
              ? `Remove ${photo.author} from favourites`
              : `Add ${photo.author} to favourites`
          }
          aria-pressed={isFavourite}
          className={`absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full shadow-md backdrop-blur transition hover:scale-110 ${
            isFavourite
              ? "bg-white text-rose-500"
              : "bg-white/90 text-gray-600 hover:text-rose-500"
          }`}
        >
          <Heart
            size={21}
            fill={isFavourite ? "currentColor" : "none"}
            strokeWidth={2}
          />
        </button>
      </div>

      <div className="flex items-center justify-between gap-3 p-4">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
            Photographer
          </p>

          <h2 className="mt-1 truncate font-semibold text-gray-800">
            {photo.author}
          </h2>
        </div>

        <span className="shrink-0 text-xs text-gray-400">ID: {photo.id}</span>
      </div>
    </article>
  );
}

export default PhotoCard;
