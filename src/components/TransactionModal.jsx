import { useState, useEffect } from "react";
import Modal from "./Modal";
import { useTracker } from "../context/TrackerContext";

export default function TransactionModal({ isOpen, onClose, type }) {
  const { addTransaction } = useTracker();
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (isOpen) {
      setDesc("");
      setAmount("");
    }
  }, [isOpen]);

  const isIncome = type === "income";

  const handleSubmit = () => {
    const numAmount = parseFloat(amount);
    if (!desc.trim() || isNaN(numAmount) || numAmount <= 0) {
      alert("INVALID DATA");
      return;
    }

    addTransaction({
      desc: desc.trim(),
      amount: numAmount,
      type,
    });

    onClose();
  };

  const titleStyle = {
    textAlign: "center",
    marginBottom: "20px",
    fontFamily: "var(--font-display)",
    fontSize: "1.5rem",
    padding: "10px",
    border: "3px solid black",
    background: isIncome ? "var(--c-success)" : "var(--c-secondary)",
    color: isIncome ? "black" : "white",
  };

  const btnStyle = {
    background: isIncome ? "var(--c-success)" : "var(--c-secondary)",
    color: isIncome ? "black" : "white",
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div style={titleStyle}>
        {isIncome ? "INJECT INCOME" : "EJECT EXPENSE"}
      </div>
      <div className="input-group">
        <label className="label">DESCRIPTION</label>
        <input
          type="text"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="ITEM NAME"
        />
      </div>
      <div className="input-group">
        <label className="label">AMOUNT ($)</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />
      </div>
      <button className="btn" style={btnStyle} onClick={handleSubmit}>
        EXECUTE
      </button>
    </Modal>
  );
}
