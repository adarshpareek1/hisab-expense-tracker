import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose"
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import budgetRoutes from "./routes/budgetRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import passport from "passport";
import "./config/passport.js";

connectDB();

const app = express();
app.use(cors({
  origin: ["http://localhost:5173", "https://hisab-expense-tracker.vercel.app"],
  credentials: true
}));
app.use(express.json());
app.use(passport.initialize());
app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/budget", budgetRoutes);
app.use("/api/analytics", analyticsRoutes);
app.get("/db-ping", async (req, res)=>{
  try{
    await mongoose.connection.db.command({ ping: 1 });
    return res.status(200).send("Database pinged successfully");
  }
  catch(err){
    console.error(err);
    return res.status(500).send("Some error occured");
  }
})
app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
