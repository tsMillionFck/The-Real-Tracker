import express from "express";
import authMiddleware from "../middleware/auth.js";
import TrackerData from "../models/TrackerData.js";

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// @route   GET /api/tracker
// @desc    Get user's tracker data
// @access  Private
router.get("/", async (req, res) => {
  try {
    let trackerData = await TrackerData.findOne({ user: req.user._id });

    // If no data exists, create empty tracker data
    if (!trackerData) {
      trackerData = new TrackerData({
        user: req.user._id,
        budget: 0,
        wage: 0,
        transactions: [],
      });
      await trackerData.save();
    }

    res.json({
      budget: trackerData.budget,
      wage: trackerData.wage,
      transactions: trackerData.transactions,
    });
  } catch (error) {
    console.error("Get tracker data error:", error);
    res.status(500).json({ error: "Failed to load tracker data" });
  }
});

// @route   PUT /api/tracker
// @desc    Update user's tracker data
// @access  Private
router.put("/", async (req, res) => {
  try {
    const { budget, wage, transactions } = req.body;

    let trackerData = await TrackerData.findOne({ user: req.user._id });

    if (!trackerData) {
      trackerData = new TrackerData({
        user: req.user._id,
      });
    }

    // Update fields if provided
    if (budget !== undefined) trackerData.budget = budget;
    if (wage !== undefined) trackerData.wage = wage;
    if (transactions !== undefined) trackerData.transactions = transactions;

    await trackerData.save();

    res.json({
      message: "Tracker data saved successfully",
      data: {
        budget: trackerData.budget,
        wage: trackerData.wage,
        transactions: trackerData.transactions,
      },
    });
  } catch (error) {
    console.error("Update tracker data error:", error);
    res.status(500).json({ error: "Failed to save tracker data" });
  }
});

// @route   POST /api/tracker/transaction
// @desc    Add a single transaction
// @access  Private
router.post("/transaction", async (req, res) => {
  try {
    const { desc, amount, type } = req.body;

    if (!desc || !amount || !type) {
      return res
        .status(400)
        .json({ error: "Description, amount, and type are required" });
    }

    let trackerData = await TrackerData.findOne({ user: req.user._id });

    if (!trackerData) {
      trackerData = new TrackerData({
        user: req.user._id,
        budget: 0,
        wage: 0,
        transactions: [],
      });
    }

    trackerData.transactions.push({
      desc,
      amount,
      type,
      createdAt: new Date(),
    });

    await trackerData.save();

    res.json({
      message: "Transaction added successfully",
      transaction:
        trackerData.transactions[trackerData.transactions.length - 1],
    });
  } catch (error) {
    console.error("Add transaction error:", error);
    res.status(500).json({ error: "Failed to add transaction" });
  }
});

// @route   DELETE /api/tracker/transaction/:id
// @desc    Delete a transaction
// @access  Private
router.delete("/transaction/:id", async (req, res) => {
  try {
    const trackerData = await TrackerData.findOne({ user: req.user._id });

    if (!trackerData) {
      return res.status(404).json({ error: "Tracker data not found" });
    }

    trackerData.transactions = trackerData.transactions.filter(
      (t) => t._id.toString() !== req.params.id
    );

    await trackerData.save();

    res.json({ message: "Transaction deleted successfully" });
  } catch (error) {
    console.error("Delete transaction error:", error);
    res.status(500).json({ error: "Failed to delete transaction" });
  }
});

export default router;
