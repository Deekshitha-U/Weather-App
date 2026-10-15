export default function LoadingState() {
  return (
    <div className="loading-state" role="status" aria-live="polite">
      <span className="loading-orbit"><span /></span>
      <p>Reading the atmosphere...</p>
      <span className="loading-subtitle">Connecting to live weather data</span>
    </div>
  );
}
