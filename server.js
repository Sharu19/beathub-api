import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();

app.use(express.json());

/* ROUTES */
app.use("/api/auth", authRoutes);

/* ROOT */
app.get("/", (req, res) => {
  res.send("BeatHub API Running 🚀");
});

/* DB CONNECT */
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

/* SERVER */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});