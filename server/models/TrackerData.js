import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  desc: {
    type: String,
    required: true,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  type: {
    type: String,
    enum: ["income", "expense"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const trackerDataSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  budget: {
    type: Number,
    default: 0,
  },
  wage: {
    type: Number,
    default: 0,
  },
  transactions: [transactionSchema],
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update timestamp on save
trackerDataSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model("TrackerData", trackerDataSchema);
