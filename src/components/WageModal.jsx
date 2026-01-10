import { useState, useEffect } from "react";
import Modal from "./Modal";
import { useTracker } from "../context/TrackerContext";

export default function WageModal({ isOpen, onClose }) {
  const { wage, setWage } = useTracker();
  const [value, setValue] = useState("");

  useEffect(() => {
    if (isOpen) {
      setValue(wage || "");
    }
  }, [isOpen, wage]);

  const handleSubmit = () => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0) {
      setWage(numValue);
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
        SET HOURLY VALUE
      </div>
      <div className="input-group">
        <label className="label">HOURLY WAGE ($)</label>
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="0.00"
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />
      </div>
      <button
        className="btn"
        style={{ background: "var(--c-grim)" }}
        onClick={handleSubmit}
      >
        CONFIRM_RATE
      </button>
    </Modal>
  );
}
