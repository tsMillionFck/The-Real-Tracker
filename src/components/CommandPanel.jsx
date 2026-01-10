import { useTracker } from "../context/TrackerContext";

export default function CommandPanel({
  onOpenBudget,
  onOpenWage,
  onOpenIncome,
  onOpenExpense,
}) {
  const { budget } = useTracker();

  return (
    <section className="command-grid">
      {/* Budget Card */}
      <div
        className="brutal-card"
        style={{ padding: 0, overflow: "hidden", borderBottomWidth: "8px" }}
      >
        <div
          style={{
            background: "black",
            color: "white",
            padding: "10px",
            fontWeight: "bold",
          }}
        >
          SYSTEM_LIMITS
        </div>
        <div style={{ padding: "20px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "15px",
            }}
          >
            <span>MONTHLY CAP:</span>
            <span style={{ fontWeight: 900 }}>${budget.toFixed(2)}</span>
          </div>
          <button
            className="action-btn-large btn-budget"
            onClick={onOpenBudget}
          >
            EDIT BUDGET <span>[ SET_CAP ]</span>
          </button>
        </div>
      </div>

      {/* Wage Card */}
      <div
        className="brutal-card"
        style={{
          padding: "15px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontWeight: "bold" }}>HOURLY_WAGE:</span>
        <button
          className="btn"
          style={{ width: "auto", padding: "5px 10px", fontSize: "0.8rem" }}
          onClick={onOpenWage}
        >
          SET_RATE
        </button>
      </div>

      {/* Operations Card */}
      <div
        className="brutal-card"
        style={{ padding: 0, borderBottomWidth: "8px" }}
      >
        <div
          style={{
            background: "black",
            color: "white",
            padding: "10px",
            fontWeight: "bold",
          }}
        >
          OPERATIONS
        </div>
        <div style={{ padding: "20px", display: "grid", gap: "20px" }}>
          <button
            className="action-btn-large btn-income"
            onClick={onOpenIncome}
          >
            + INJECT INCOME <span>[ REVENUE_STREAM ]</span>
          </button>
          <button
            className="action-btn-large btn-expense"
            onClick={onOpenExpense}
          >
            - EJECT EXPENSE <span>[ COST_CENTER ]</span>
          </button>
        </div>
      </div>
    </section>
  );
}
