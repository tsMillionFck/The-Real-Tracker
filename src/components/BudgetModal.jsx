import { useState, useEffect } from "react";
import Modal from "./Modal";
import { useTracker } from "../context/TrackerContext";

export default function BudgetModal({ isOpen, onClose }) {
  const { budget, setBudget } = useTracker();
  const [value, setValue] = useState("");

  useEffect(() => {
    if (isOpen) {
      setValue(budget || "");
    }
  }, [isOpen, budget]);

  const handleSubmit = () => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0) {
      setBudget(numValue);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div
        style={{
          textAlign: "center",
          marginBottom: "20px",
          fontFamily: "var(--font-display)",
          fontSize: "1.5rem",
        }}
      >
        SET BUDGET CAP
      </div>
      <div className="input-group">
        <label className="label">MONTHLY LIMIT ($)</label>
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="0.00"
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />
      </div>
      <button className="btn btn-budget" onClick={handleSubmit}>
        CONFIRM_LIMIT
      </button>
    </Modal>
  );
}
