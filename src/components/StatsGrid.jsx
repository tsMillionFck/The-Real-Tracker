import { useTracker } from "../context/TrackerContext";

export default function StatsGrid() {
  const { totalIncome, totalExpense, balance } = useTracker();

  return (
    <div className="stats-grid">
      <div className="stat-box" style={{ background: "var(--c-success)" }}>
        <div style={{ fontSize: "0.7rem", fontWeight: "bold" }}>TOTAL IN</div>
        <div className="stat-val">+${totalIncome}</div>
      </div>
      <div
        className="stat-box"
        style={{ background: "var(--c-secondary)", color: "white" }}
      >
        <div style={{ fontSize: "0.7rem", fontWeight: "bold" }}>TOTAL OUT</div>
        <div className="stat-val">-${totalExpense}</div>
      </div>
      <div className="stat-box" style={{ background: "var(--c-accent)" }}>
        <div style={{ fontSize: "0.7rem", fontWeight: "bold" }}>NET</div>
        <div className="stat-val">${balance}</div>
      </div>
    </div>
  );
}
