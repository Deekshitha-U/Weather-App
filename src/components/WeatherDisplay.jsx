
import WeatherDetails from "./WeatherDetails.jsx";

function WeatherSymbol({ main = "" }) {
  const condition = main.toLowerCase();

  if (condition.includes("thunder")) {
    return (
      <span className="weather-symbol" aria-hidden="true">
        ϟ
      </span>
    );
  }

  if (condition.includes("rain") || condition.includes("drizzle")) {
    return (
      <span className="weather-symbol rain-symbol" aria-hidden="true">
        ☂
      </span>
    );
  }

  if (condition.includes("snow")) {
    return (
      <span className="weather-symbol" aria-hidden="true">
        ❄
      </span>
    );
  }

  if (
    condition.includes("cloud") ||
    condition.includes("mist") ||
    condition.includes("fog") ||
    condition.includes("haze") ||
    condition.includes("smoke")
  ) {
    return (
      <span className="weather-symbol cloud-symbol" aria-hidden="true">
        ☁
      </span>
    );
  }

  return (
    <span className="weather-symbol sun-symbol" aria-hidden="true">
      ☼
    </span>
  );
}

export default function WeatherDisplay({ data, unit, onToggleUnit }) {
  const description = data.weather?.[0]?.description ?? "";
  const condition = data.weather?.[0]?.main ?? "Weather unavailable";

  const localTime = new Date(
    (Date.now() / 1000 + (data.timezone ?? 0)) * 1000
  );

  const time = localTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });

  const convertTemperature = (temperature) => {
    if (typeof temperature !== "number") return "--";

    return Math.round(
      unit === "C" ? temperature : (temperature * 9) / 5 + 32
    );
  };

  const temp = convertTemperature(data.main?.temp);
  const high = convertTemperature(data.main?.temp_max);
  const low = convertTemperature(data.main?.temp_min);

  const formattedDescription = description
    ? description.charAt(0).toUpperCase() + description.slice(1)
    : "Description unavailable";

  return (
    <div className="weather-content">
      <section className="hero-weather">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="live-dot" /> LIVE CONDITIONS
            <span className="eyebrow-divider">/</span> {time}
          </div>

          <p className="location-line">
            <span aria-hidden="true">⌖</span>{" "}
            {data.name}
            {data.sys?.country ? `, ${data.sys.country}` : ""}
          </p>

          <div className="temperature-row">
            <strong className="temperature">
              {temp}
              <span>°</span>
            </strong>

            <div className="unit-switch" aria-label="Temperature unit">
              <button
                className={unit === "C" ? "active" : ""}
                onClick={() => onToggleUnit("C")}
                aria-pressed={unit === "C"}
              >
                °C
              </button>
              <span>/</span>
              <button
                className={unit === "F" ? "active" : ""}
                onClick={() => onToggleUnit("F")}
                aria-pressed={unit === "F"}
              >
                °F
              </button>
            </div>
          </div>

          <h2 className="condition-title">{condition}</h2>
          <p className="condition-description">{formattedDescription}</p>

          <p className="high-low">
            H {high}° <span>·</span> L {low}°
          </p>
        </div>

        <div className="hero-visual">
          <div className="visual-ring ring-one" />
          <div className="visual-ring ring-two" />
          <WeatherSymbol main={condition} />
          <span className="visual-caption">
            ATMOSPHERIC
            <br />
            SNAPSHOT
          </span>
        </div>
      </section>

      <div className="section-heading">
        <div>
          <span className="section-kicker">THE DETAILS</span>
          <h3>Outside, right now.</h3>
        </div>
        <span className="section-index">01 — 04</span>
      </div>

      <WeatherDetails data={data} />

      <p className="data-footnote">
        Live conditions supplied by OpenWeatherMap · Temperatures rounded to
        the nearest degree
      </p>
    </div>
  );
}
