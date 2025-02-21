import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import reimbursementRoutes from "./routes/reimbursementRoutes.js";

dotenv.config();
const app = express();


app.use(express.json());


app.use("/api", reimbursementRoutes);


const PORT = process.env.PORT || 5000;
connectDB();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
