import { Heart, Search } from "lucide-react";

function EmptyState({ showFavourites, search }) {
  const hasSearch = search.trim().length > 0;

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
      <div className="mb-4 rounded-full bg-gray-100 p-4 text-gray-500">
        {showFavourites && !hasSearch ? (
          <Heart size={30} />
        ) : (
          <Search size={30} />
        )}
      </div>

      <h2 className="text-lg font-semibold text-gray-800">
        {hasSearch
          ? "No photos found"
          : showFavourites
            ? "No favourites yet"
            : "No photos available"}
      </h2>

      <p className="mt-2 max-w-sm text-sm text-gray-500">
        {hasSearch
          ? "Try searching with a different author name."
          : showFavourites
            ? "Tap the heart on any photo to save it to your favourites."
            : "There are no photos to display right now."}
      </p>
    </div>
  );
}

export default EmptyState;
