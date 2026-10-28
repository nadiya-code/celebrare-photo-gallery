# 📸 Celebrare Photo Gallery

A responsive photo gallery application built with React and Tailwind CSS. Browse beautiful photos, search by photographer name, and save your favourite photos for later.

## 🌐 Live Demo

[View Celebrare Photo Gallery](https://celebrare-photo-gallery-peach.vercel.app/)

## ✨ Features

- **Photo Gallery:** Fetch and display photos from the Picsum Photos API.
- **Search:** Search photos by photographer name.
- **Favourites:** Add or remove photos using heart icons.
- **Persistent Storage:** Favourites remain saved after refreshing the page using localStorage.
- **Responsive Design:** Responsive layout for mobile, tablet, and desktop screens.
- **Loading State:** Displays a loading indicator while photos are being fetched.
- **Error Handling:** Displays an error message if photos cannot be loaded.
- **Empty State:** Shows helpful messages when no matching photos or favourites are available.

## 🛠️ Technologies Used

- React
- JavaScript
- Tailwind CSS
- Vite
- Lucide React
- Picsum Photos API
- Browser localStorage

## 🚀 Getting Started

### Prerequisites

Install [Node.js](https://nodejs.org/) and npm on your computer.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/nadiya-code/celebrare-photo-gallery.git
   ```

2. Navigate to the project directory:

   ```bash
   cd celebrare-photo-gallery
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL displayed in your terminal.

## 📂 Project Structure

```text
src/
├── components/
│   ├── EmptyState.jsx
│   ├── Favourites.jsx
│   ├── Gallery.jsx
│   ├── Header.jsx
│   ├── PhotoCard.jsx
│   └── SearchBar.jsx
├── App.jsx
├── index.css
└── main.jsx
```

## 🧠 React Concepts Used

- Functional components
- Props for sharing data between components
- `useState` for managing UI state
- `useEffect` for fetching photos and synchronizing favourites with localStorage
- `useReducer` for managing favourite actions
- Array methods such as `map`, `filter`, and `some`
- Conditional rendering
- API integration using `fetch`

## 👩‍💻 Author

**Nadiya Kola**

GitHub: [nadiya-code](https://github.com/nadiya-code)

---

Built with React and Tailwind CSS.
