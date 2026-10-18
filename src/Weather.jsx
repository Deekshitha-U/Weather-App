
import { useState } from "react";
import { fetchWeather } from "./services/weatherApi.js";
import SearchBar from "./components/SearchBar.jsx";
import WeatherBackground from "./components/WeatherBackground.jsx";
import WeatherDisplay from "./components/WeatherDisplay.jsx";
import LoadingState from "./components/LoadingState.jsx";

export default function Weather() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [unit, setUnit] = useState("C");
  const [lastCity, setLastCity] = useState("");

  async function getWeather(city) {
    const trimmedCity = city?.trim();

    // Empty input: clear previous results and show an error.
    if (!trimmedCity) {
      setWeather(null);
      setError("Please enter a city name before exploring.");
      setLastCity("");
      setLoading(false);
      return;
    }

    // Clear old weather immediately when a new search starts.
    setWeather(null);
    setError("");
    setLastCity("");
    setLoading(true);

    try {
      const data = await fetchWeather(trimmedCity);
      setWeather(data);
      setLastCity(data.name || trimmedCity);
    } catch (err) {
      setWeather(null);

      if (err.response?.status === 404) {
        setError(
          "We couldn't find that city. Check the spelling and try again."
        );
      } else if (err.response?.status === 401) {
        setError(
          "The weather API key was rejected. Please check your API key."
        );
      } else if (err.message?.includes("Missing API key")) {
        setError(err.message);
      } else {
        setError(
          "Unable to fetch weather. Please check your connection and try again."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="app-shell">
      <WeatherBackground
        condition={weather?.weather?.[0]?.main ?? ""}
      />

      <div className="app-frame">
        <header className="topbar">
          <a className="brand" href="/" aria-label="ATMOS home">
            <span className="brand-mark">
              <span />
            </span>
            <span>
              ATMOS<span className="brand-period">.</span>
            </span>
          </a>

          <div className="topbar-right">
            <span className="status-pip" />
            ATMOSPHERE, DECODED
            <span className="topbar-number">NO. 001</span>
          </div>
        </header>

        <section className="intro">
          <p className="overline">A WINDOW INTO THE WORLD</p>
          <h1>
            Weather, <em>in motion.</em>
          </h1>
          <p className="intro-copy">
            A little closer to the sky. Find the atmosphere of any place on Earth.
          </p>

          <SearchBar onSearch={getWeather} loading={loading} />

          {error && (
            <p className="error-message" role="alert">
              <span aria-hidden="true">!</span> {error}
            </p>
          )}
        </section>

        <section className="results-area" aria-live="polite">
          {loading ? (
            <LoadingState />
          ) : error ? (
            <div className="search-error-state">
              <p className="section-kicker">SEARCH UNAVAILABLE</p>
              <h2>Let's try another search.</h2>
              <p>{error}</p>
            </div>
          ) : weather ? (
            <WeatherDisplay
              data={weather}
              unit={unit}
              onToggleUnit={setUnit}
            />
          ) : (
            <div className="empty-state">
              <div className="empty-orbit">
                <span className="empty-sun" />
                <span className="empty-dot dot-a" />
                <span className="empty-dot dot-b" />
              </div>

              <div>
                <span className="section-kicker">YOUR SKY IS WAITING</span>
                <h2>Somewhere, the weather is changing.</h2>
                <p>
                  Search for a city above to reveal its current conditions.
                </p>
              </div>

              <span className="empty-coordinate">LAT — / LONG —</span>
            </div>
          )}
        </section>

        <footer className="footer">
          <span>DESIGNED TO FEEL THE WEATHER.</span>
          <span>
            {lastCity
              ? `LAST VIEWED · ${lastCity.toUpperCase()}`
              : "LIVE DATA · OPENWEATHERMAP"}
          </span>
          <span className="footer-right">
            MADE OF SKY <span>✳</span>
          </span>
        </footer>
      </div>
    </main>
  );
}
