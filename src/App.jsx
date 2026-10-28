import { useEffect, useReducer, useState } from "react";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Favourites from "./components/Favourites";
import Gallery from "./components/Gallery";
import EmptyState from "./components/EmptyState";

const API_URL = "https://picsum.photos/v2/list?limit=30";

const STORAGE_KEY = "celebrare-favourites";

function getSavedFavourites() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return [];
    }

    const parsed = JSON.parse(saved);

    return Array.isArray(parsed) ? parsed : [];
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
  const [showFavourites, setShowFavourites] = useState(false);

  const [favourites, dispatch] = useReducer(
    favouritesReducer,
    [],
    getSavedFavourites,
  );

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
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
    } catch {
      console.error("Unable to save favourites.");
    }
  }, [favourites]);

  function toggleFavourite(photo) {
    dispatch({
      type: "TOGGLE_FAVOURITE",
      payload: photo,
    });
  }

  const photosToDisplay = showFavourites ? favourites : photos;

  const filteredPhotos = photosToDisplay.filter((photo) =>
    photo.author.toLowerCase().includes(search.trim().toLowerCase()),
  );

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />

        <p className="text-sm text-gray-500">Loading beautiful photos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
        <p className="text-red-600">{error}</p>

        <button
          type="button"
          onClick={() => window.location.reload()}
          className="rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Header />

        <section className="mb-8 flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:p-5">
          <div className="flex-1">
            <SearchBar search={search} setSearch={setSearch} />
          </div>

          <Favourites
            showFavourites={showFavourites}
            setShowFavourites={setShowFavourites}
            favouritesCount={favourites.length}
          />
        </section>

        <main>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">
              {showFavourites ? "Your Favourites" : "Explore Photos"}
            </h2>

            <span className="text-sm text-gray-500">
              {filteredPhotos.length}{" "}
              {filteredPhotos.length === 1 ? "photo" : "photos"}
            </span>
          </div>

          {filteredPhotos.length === 0 ? (
            <EmptyState showFavourites={showFavourites} search={search} />
          ) : (
            <Gallery
              photos={filteredPhotos}
              favourites={favourites}
              onToggleFavourite={toggleFavourite}
            />
          )}
        </main>

        <footer className="mt-12 border-t border-gray-200 py-6 text-center text-sm text-gray-500">
          Built with React and Tailwind CSS
        </footer>
      </div>
    </div>
  );
}

export default App;
