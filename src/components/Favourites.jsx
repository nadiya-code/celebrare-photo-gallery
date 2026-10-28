import { Heart, Images } from "lucide-react";

function Favourites({ showFavourites, setShowFavourites, favouritesCount }) {
  return (
    <div className="flex shrink-0 gap-2">
      <button
        type="button"
        onClick={() => setShowFavourites(false)}
        aria-pressed={!showFavourites}
        className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition ${
          !showFavourites
            ? "bg-blue-600 text-white shadow-sm"
            : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
        }`}
      >
        <Images size={18} />
        All Photos
      </button>

      <button
        type="button"
        onClick={() => setShowFavourites(true)}
        aria-pressed={showFavourites}
        className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition ${
          showFavourites
            ? "bg-pink-600 text-white shadow-sm"
            : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
        }`}
      >
        <Heart size={18} fill={showFavourites ? "currentColor" : "none"} />
        Favourites
        <span className="rounded-full bg-black/10 px-2 py-0.5 text-xs">
          {favouritesCount}
        </span>
      </button>
    </div>
  );
}

export default Favourites;
