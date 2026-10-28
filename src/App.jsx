import { useEffect, useReducer, useState } from "react";

const API_URL = "https://picsum.photos/v2/list?limit=30";

function getSavedFavourites() {
  try {
    const saved = localStorage.getItem("celebrare-favourites");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function favouritesReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_FAVOURITE": {
      const photo = action.payload;
      const alreadyFavourite = state.some((item) => item.id === photo.id);
      if (alreadyFavourite) {
        return state.filter((item) => item.id !== photo.id);
      }

      return [...state, photo];
    }

    default:
      return state;
  }
}

function App() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const [favourites, dispatch] = useReducer(
    favouritesReducer,
    [],
    getSavedFavourites,
  );

  const [showFavourites, setShowFavourites] = useState(false);

  useEffect(() => {
    async function fetchPhotos() {
      try {
        setLoading(true);
        setError("");
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Failed to fetch photos");
        }

        const data = await response.json();
        setPhotos(data);
      } catch {
        setError("Unable to load photos. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchPhotos();
  }, []);

  useEffect(() => {
    localStorage.setItem("celebrare-favourites", JSON.stringify(favourites));
  }, [favourites]);

  function toggleFavourite(photo) {
    dispatch({
      type: "TOGGLE_FAVOURITE",
      payload: photo,
    });
  }

  const displayedPhotos = (showFavourites ? favourites : photos).filter(
    (photo) => photo.author.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        {" "}
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />{" "}
        <p className="text-gray-600">Loading photos...</p>{" "}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        {" "}
        <p className="text-lg text-red-600">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
        >
          Try Again{" "}
        </button>{" "}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-10">
      {" "}
      <header className="mx-auto mb-8 max-w-7xl">
        {" "}
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Celebrare Photo Gallery{" "}
        </h1>
        <p className="mt-2 text-gray-600">
          Discover beautiful photos from talented photographers.
        </p>
        <div className="mt-6 flex flex-col gap-4 sm:flex-row">
          <input
            type="text"
            placeholder="Search by author..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500 sm:max-w-md"
          />

          <button
            onClick={() => setShowFavourites(false)}
            className={`rounded-lg px-5 py-3 font-medium ${
              !showFavourites
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border border-gray-300"
            }`}
          >
            All Photos
          </button>

          <button
            onClick={() => setShowFavourites(true)}
            className={`rounded-lg px-5 py-3 font-medium ${
              showFavourites
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border border-gray-300"
            }`}
          >
            ♥ Favourites ({favourites.length})
          </button>
        </div>
      </header>
      <main className="mx-auto max-w-7xl">
        {displayedPhotos.length === 0 ? (
          <p className="py-16 text-center text-gray-500">
            {showFavourites && favourites.length === 0
              ? "No favourites yet. Click the heart on a photo to add one!"
              : "No photos found."}
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {displayedPhotos.map((photo) => {
              const isFavourite = favourites.some(
                (item) => item.id === photo.id,
              );

              return (
                <article
                  key={photo.id}
                  className="overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-lg"
                >
                  <img
                    src={photo.download_url}
                    alt={`Photo by ${photo.author}`}
                    className="h-56 w-full object-cover"
                    loading="lazy"
                  />

                  <div className="flex items-center justify-between p-4">
                    <p className="font-medium text-gray-800">{photo.author}</p>

                    <button
                      type="button"
                      onClick={() => toggleFavourite(photo)}
                      aria-label={
                        isFavourite
                          ? `Remove ${photo.author} from favourites`
                          : `Add ${photo.author} to favourites`
                      }
                      aria-pressed={isFavourite}
                      className={`text-2xl transition-transform hover:scale-110 ${
                        isFavourite ? "text-red-500" : "text-gray-400"
                      }`}
                    >
                      {isFavourite ? "♥" : "♡"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
