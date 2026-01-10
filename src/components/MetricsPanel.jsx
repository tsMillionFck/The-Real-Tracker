import { useTracker } from "../context/TrackerContext";

export default function MetricsPanel() {
  const { runwayDays, lifeHoursImpact } = useTracker();

  // Determine runway color
  const getRunwayColor = () => {
    if (runwayDays === Infinity) return "white";
    if (runwayDays > 30) return "var(--c-success)";
    if (runwayDays > 7) return "var(--c-primary)";
    return "var(--c-secondary)";
  };

  // Determine if in "freedom" mode (net positive life impact)
  const isFreedom = lifeHoursImpact < 0;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "30px",
        marginTop: "30px",
      }}
    >
      {/* Runway Card */}
      <div className="runway-card">
        <div>
          <span
            style={{ fontSize: "0.8rem", fontWeight: "bold", color: "#888" }}
          >
            EST. RUNWAY
          </span>
          <div className="runway-val" style={{ color: getRunwayColor() }}>
            {runwayDays === Infinity ? "∞" : runwayDays}
          </div>
        </div>
        <div style={{ textAlign: "right", fontSize: "0.8rem", opacity: 0.8 }}>
          DAYS LEFT
          <br />
          OF FUNDS
        </div>
      </div>

      {/* Life Card */}
      <div className={`life-card ${isFreedom ? "freedom" : ""}`}>
        <div style={{ fontSize: "0.8rem", fontWeight: "bold", opacity: 0.8 }}>
          HOURS IMPACT
        </div>
        <div className="life-val">
          {lifeHoursImpact >= 0 ? "+" : ""}
          {Math.abs(lifeHoursImpact).toFixed(1)}
        </div>
        <div style={{ fontSize: "0.8rem", fontWeight: "bold" }}>
          NET LIFE COST
        </div>
      </div>
    </div>
  );
}
