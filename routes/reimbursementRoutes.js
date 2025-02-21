import express from "express";
import { submitReimbursement, getTotalReimbursement } from "../controllers/reimbursement.controller.js";

const router = express.Router();

router.post("/reimbursements", submitReimbursement);
router.get("/reimbursements-total/:user_id", getTotalReimbursement);

export default router;
