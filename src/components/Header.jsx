import { Camera } from "lucide-react";

function Header() {
  return (
    <header className="mb-8">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-blue-600 p-3 text-white">
          <Camera size={28} />
        </div>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Photo Gallery
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Discover beautiful moments from talented photographers.
          </p>
        </div>
      </div>
    </header>
  );
}

export default Header;
