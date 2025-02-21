import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const reimbursementSchema = new mongoose.Schema({
  reimbursement_id: {
    type: String,
    default: uuidv4,
  },
  user_id: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
    maxlength: 255,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  currency: {
    type: String,
    enum: ["USD", "INR"],
    required: true,
  },
});

const Reimbursement = mongoose.model("Reimbursement", reimbursementSchema);

export default Reimbursement;
