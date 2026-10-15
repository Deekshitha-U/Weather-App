const details = [
  { key: "feels", label: "FEELS LIKE", icon: "◉", getValue: (data) => `${Math.round(data.main.feels_like)}°`, note: "What it feels like" },
  { key: "humidity", label: "HUMIDITY", icon: "◌", getValue: (data) => `${data.main.humidity}%`, note: "Air moisture" },
  { key: "wind", label: "WIND SPEED", icon: "≋", getValue: (data) => `${Number(data.wind.speed).toFixed(1)} m/s`, note: "Near surface" },
  { key: "pressure", label: "PRESSURE", icon: "⌁", getValue: (data) => `${data.main.pressure} hPa`, note: "Sea-level pressure" },
];

export default function WeatherDetails({ data }) {
  return (
    <section className="details-grid" aria-label="Weather details">
      {details.map((item, index) => (
        <article className="detail-card" key={item.key} style={{ "--delay": `${index * 90}ms` }}>
          <div className="detail-top">
            <span className="detail-icon" aria-hidden="true">{item.icon}</span>
            <span className="detail-label">{item.label}</span>
          </div>
          <strong className="detail-value">{item.getValue(data)}</strong>
          <span className="detail-note">{item.note}</span>
        </article>
      ))}
    </section>
  );
}
