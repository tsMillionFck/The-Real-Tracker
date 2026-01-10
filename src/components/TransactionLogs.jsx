import { useState } from "react";
import { useTracker } from "../context/TrackerContext";

export default function TransactionLogs() {
  const { transactions, deleteTransaction } = useTracker();
  const [isExpanded, setIsExpanded] = useState(false);

  const reversedTransactions = [...transactions].reverse();
  const latestTransaction = reversedTransactions[0];

  return (
    <div className="brutal-card">
      <div className="log-header">
        <h2>RAW_LOGS</h2>
        <button
          className="toggle-btn"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "[ COLLAPSE - ]" : "[ EXPAND HISTORY + ]"}
        </button>
      </div>

      <div id="logPreviewContainer">
        <div style={{ fontSize: "0.8rem", marginBottom: "5px", opacity: 0.6 }}>
          MOST RECENT ACTIVITY:
        </div>
        <div className="log-preview">
          {latestTransaction ? (
            <>
              <span>{latestTransaction.desc.toUpperCase()}</span>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <span
                  style={{
                    background:
                      latestTransaction.type === "income"
                        ? "var(--c-success)"
                        : "var(--c-secondary)",
                    color:
                      latestTransaction.type === "income" ? "black" : "white",
                    padding: "2px 5px",
                    border: "1px solid black",
                    fontSize: "0.7rem",
                  }}
                >
                  {latestTransaction.type.toUpperCase()}
                </span>
                <span>${latestTransaction.amount.toFixed(2)}</span>
              </div>
            </>
          ) : (
            <span>NO DATA AVAILABLE</span>
          )}
        </div>
      </div>

      <div className={`log-full ${isExpanded ? "open" : ""}`}>
        <div style={{ overflowX: "auto" }}>
          <table>
            <thead>
              <tr>
                <th>ITEM</th>
                <th>$$$</th>
                <th>TYPE</th>
                <th>X</th>
              </tr>
            </thead>
            <tbody>
              {reversedTransactions.map((tx) => (
                <tr key={tx.id}>
                  <td>{tx.desc.toUpperCase()}</td>
                  <td>${tx.amount.toFixed(2)}</td>
                  <td>
                    <span
                      className={`tag ${
                        tx.type === "income" ? "tag-inc" : "tag-exp"
                      }`}
                    >
                      {tx.type}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => deleteTransaction(tx.id)}
                      style={{
                        background: "black",
                        color: "white",
                        border: "none",
                        cursor: "pointer",
                        padding: "5px 10px",
                        fontWeight: "bold",
                      }}
                    >
                      X
                    </button>
                  </td>
                </tr>
              ))}
              {reversedTransactions.length === 0 && (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center", opacity: 0.5 }}>
                    NO TRANSACTIONS RECORDED
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
