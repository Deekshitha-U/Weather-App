
import { useState } from "react";

export default function SearchBar({ onSearch, loading }) {
  const [value, setValue] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const trimmed = value.trim();

    if (!trimmed || loading) return;

    onSearch(trimmed);
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <span className="search-icon" aria-hidden="true">
        ⌕
      </span>

      <label className="sr-only" htmlFor="city-search">
        Search city
      </label>

      <input
        id="city-search"
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Search any city..."
        autoComplete="off"
        aria-label="City name"
      />

      <button
        type="submit"
        disabled={loading}
        aria-busy={loading}
      >
        {loading ? (
          <>
            <span className="button-spinner" aria-hidden="true" />
            Searching
          </>
        ) : (
          "Explore"
        )}
      </button>
    </form>
  );
}
