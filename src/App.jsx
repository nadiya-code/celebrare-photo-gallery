import { useEffect, useState } from "react";

function App() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPhotos() {
      try {
        setLoading(true);
        setError("");
        const response = await fetch("https://picsum.photos/v2/list?limit=30");

        if (!response.ok) {
          throw new Error("Failed to fetch photos");
        }

        const data = await response.json();
        setPhotos(data);
      } catch (err) {
        setError("Unable to load photos. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchPhotos();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        {" "}
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>{" "}
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
        </h1>{" "}
        <p className="mt-2 text-gray-600">
          Discover beautiful photos from talented photographers.{" "}
        </p>{" "}
      </header>
      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {photos.map((photo) => (
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

            <div className="p-4">
              <p className="font-medium text-gray-800">{photo.author}</p>
            </div>
          </article>
        ))}
      </main>
    </div>
  );
}

export default App;
