import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import albumRoutes from "./routes/album.routes.js";
import artistRoutes from "./routes/artist.routes.js";
import playlistRoutes from "./routes/playlist.routes.js";
import songRoutes from "./routes/song.routes.js";
import userRoutes from "./routes/user.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";

dotenv.config();

const app = express();

/* Middleware */
app.use(cors());
app.use(express.json());

/* Routes */
app.use("/api/albums", albumRoutes);
app.use("/api/artists", artistRoutes);
app.use("/api/playlists", playlistRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/users", userRoutes);
app.use("/api/analytics", analyticsRoutes);

/* MongoDB Connection */
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

/* Port Configuration */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});