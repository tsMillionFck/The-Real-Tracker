import { useEffect, useRef } from "react";
import { useTracker } from "../context/TrackerContext";

export default function FluxChart() {
  const canvasRef = useRef(null);
  const { budget, getGraphData } = useTracker();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    const { incHistory, expHistory } = getGraphData();

    if (incHistory.length < 2) {
      // Clear and show placeholder
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#999";
      ctx.font = "bold 14px Courier New";
      ctx.textAlign = "center";
      ctx.fillText(
        "ADD TRANSACTIONS TO VIEW GRAPH",
        canvas.width / 2,
        canvas.height / 2
      );
      return;
    }

    const budgetVal = budget || 0;
    const maxVal = Math.max(...incHistory, ...expHistory, budgetVal);
    const minVal = 0;
    const range = maxVal - minVal || 1;
    const pad = 30;

    const getY = (val) => {
      return (
        canvas.height -
        pad -
        ((val - minVal) / range) * (canvas.height - pad * 2)
      );
    };

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw budget line (Yellow Dashed)
    if (budgetVal > 0) {
      const yBudget = getY(budgetVal);
      ctx.beginPath();
      ctx.strokeStyle = "#FFDE59";
      ctx.lineWidth = 2;
      ctx.setLineDash([10, 10]);
      ctx.moveTo(0, yBudget);
      ctx.lineTo(canvas.width, yBudget);
      ctx.stroke();
      ctx.setLineDash([]);

      // Label
      ctx.fillStyle = "#000";
      ctx.font = "bold 10px Courier New";
      ctx.textAlign = "left";
      ctx.fillText(`CAP: $${budgetVal}`, 5, yBudget - 5);
    }

    // Draw data lines
    const drawLine = (data, color) => {
      ctx.beginPath();
      ctx.lineWidth = 4;
      ctx.strokeStyle = color;
      ctx.lineJoin = "round";

      data.forEach((val, i) => {
        const x = (i / (data.length - 1)) * canvas.width;
        const y = getY(val);
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.stroke();
    };

    drawLine(incHistory, "#C0FF00"); // Green Income
    drawLine(expHistory, "#FF5757"); // Red Expense
  }, [budget, getGraphData]);

  return (
    <div className="brutal-card">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "15px",
        }}
      >
        <h2 style={{ margin: 0, fontSize: "1.2rem" }}>LIMIT_FLUX_GRAPH</h2>
        <div className="chart-legend">
          <div className="legend-item">
            <div
              className="dot"
              style={{ background: "var(--c-success)" }}
            ></div>{" "}
            IN
          </div>
          <div className="legend-item">
            <div
              className="dot"
              style={{ background: "var(--c-secondary)" }}
            ></div>{" "}
            OUT
          </div>
          <div className="legend-item">
            <div
              className="dot"
              style={{ background: "var(--c-primary)" }}
            ></div>{" "}
            CAP
          </div>
        </div>
      </div>
      <div className="chart-container">
        <canvas
          ref={canvasRef}
          style={{ width: "100%", height: "100%" }}
        ></canvas>
      </div>
    </div>
  );
}
