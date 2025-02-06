import express from "express";
import mongoose, { connect } from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json()); //Parse Json Data

//Conntect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log("MongoDB connection error:", err));

// Rotues
app.use("/api/auth", authRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));