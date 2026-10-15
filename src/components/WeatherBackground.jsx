export default function WeatherBackground({ condition = "" }) {
  const normalized = condition.toLowerCase();
  const type = normalized.includes("rain") || normalized.includes("drizzle") || normalized.includes("thunder")
    ? "rain"
    : normalized.includes("cloud") || normalized.includes("mist") || normalized.includes("fog")
      ? "cloudy"
      : normalized.includes("snow")
        ? "snow"
        : "clear";

  return (
    <div className={`weather-scene scene-${type}`} aria-hidden="true">
      <div className="scene-orb" />
      <div className="scene-cloud cloud-one" />
      <div className="scene-cloud cloud-two" />
      <div className="scene-cloud cloud-three" />
      <div className="scene-haze" />
      <div className="scene-grid" />
    </div>
  );
}
