import Reimbursement from "../models/reimbursement.model.js";


export const submitReimbursement = async (req, res) => {
  try {
    const { user_id, description, amount, currency } = req.body;
    
    
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);

    const existingRequest = await Reimbursement.findOne({
      user_id,
      description,
      amount,
      created_at: { $gte: oneDayAgo },
    });

    if (existingRequest) {
      return res.status(409).json({ status: 409, message: "Duplicate request!!!" });
    }

    const newRequest = new Reimbursement({ user_id, description, amount, currency });
    await newRequest.save();

    res.status(201).json({
      status: 201,
      reimbursement_id: newRequest.reimbursement_id,
      user_id,
      description,
      amount,
      currency,
      status: "Pending",
      message: "Welcome to the reimbursement portal.",
    });

  } catch (error) {
    res.status(500).json({ status: 500, message: "Server error" });
  }
};


export const getTotalReimbursement = async (req, res) => {
  try {
    const { user_id } = req.params;
    
    const reimbursements = await Reimbursement.find({ user_id, status: "Pending" });

    let totalAmountUSD = 0;
    reimbursements.forEach(({ amount, currency }) => {
      totalAmountUSD += currency === "INR" ? amount / 80 : amount;
    });

    res.json({
      user_id,
      total_amount: totalAmountUSD.toFixed(2),
      currency: "USD",
    });

  } catch (error) {
    res.status(500).json({ status: 500, message: "Server error" });
  }
};
