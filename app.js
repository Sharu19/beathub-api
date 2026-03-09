const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

/* =========================
   MIDDLEWARE
========================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =========================
   ROUTES IMPORT
========================= */
const analyticsRoutes = require("./routes/analytics.routes");

/* =========================
   ROUTES MOUNT
========================= */
app.use("/api/analytics", analyticsRoutes);

/* =========================
   DEFAULT ROUTE
========================= */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Learning Platform API is running"
  });
});

/* =========================
   DATABASE CONNECTION
========================= */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error);
  });

/* =========================
   SERVER START
========================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = app;