import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Analytics route working");
});

export default router;