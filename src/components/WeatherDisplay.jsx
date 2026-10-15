import WeatherDetails from "./WeatherDetails.jsx";

function WeatherSymbol({ main = "" }) {
  const condition = main.toLowerCase();
  if (condition.includes("thunder")) return <span className="weather-symbol" aria-hidden="true">ϟ</span>;
  if (condition.includes("rain") || condition.includes("drizzle")) return <span className="weather-symbol rain-symbol" aria-hidden="true">☂</span>;
  if (condition.includes("snow")) return <span className="weather-symbol" aria-hidden="true">❄</span>;
  if (condition.includes("cloud") || condition.includes("mist") || condition.includes("fog")) return <span className="weather-symbol cloud-symbol" aria-hidden="true">☁</span>;
  return <span className="weather-symbol sun-symbol" aria-hidden="true">☼</span>;
}

export default function WeatherDisplay({ data, unit, onToggleUnit }) {
  const description = data.weather?.[0]?.description ?? "Weather unavailable";
  const condition = data.weather?.[0]?.main ?? "Weather";
  const localTime = new Date((Date.now() / 1000 + data.timezone) * 1000);
  const time = localTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", timeZone: "UTC" });

  const temp = unit === "C"
    ? Math.round(data.main.temp)
    : Math.round((data.main.temp * 9) / 5 + 32);

  return (
    <div className="weather-content">
      <section className="hero-weather">
        <div className="hero-copy">
          <div className="eyebrow"><span className="live-dot" /> LIVE CONDITIONS <span className="eyebrow-divider">/</span> {time}</div>
          <p className="location-line"><span aria-hidden="true">⌖</span> {data.name}{data.sys?.country ? `, ${data.sys.country}` : ""}</p>
          <div className="temperature-row">
            <strong className="temperature">{temp}<span>°</span></strong>
            <div className="unit-switch" aria-label="Temperature unit">
              <button className={unit === "C" ? "active" : ""} onClick={() => onToggleUnit("C")} aria-pressed={unit === "C"}>°C</button>
              <span>/</span>
              <button className={unit === "F" ? "active" : ""} onClick={() => onToggleUnit("F")} aria-pressed={unit === "F"}>°F</button>
            </div>
          </div>
          <h2 className="condition-title">{condition}</h2>
          <p className="condition-description">{description.charAt(0).toUpperCase() + description.slice(1)}</p>
          <p className="high-low">H {Math.round(unit === "C" ? data.main.temp_max : data.main.temp_max * 9 / 5 + 32)}° <span>·</span> L {Math.round(unit === "C" ? data.main.temp_min : data.main.temp_min * 9 / 5 + 32)}°</p>
        </div>
        <div className="hero-visual">
          <div className="visual-ring ring-one" />
          <div className="visual-ring ring-two" />
          <WeatherSymbol main={condition} />
          <span className="visual-caption">ATMOSPHERIC<br />SNAPSHOT</span>
        </div>
      </section>
      <div className="section-heading">
        <div><span className="section-kicker">THE DETAILS</span><h3>Outside, right now.</h3></div>
        <span className="section-index">01 — 04</span>
      </div>
      <WeatherDetails data={data} />
      <p className="data-footnote">Live conditions supplied by OpenWeatherMap · Temperatures rounded to the nearest degree</p>
    </div>
  );
}
