import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Song route working");
});

export default router;