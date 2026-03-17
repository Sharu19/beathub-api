import express from "express";
import User from "../models/User.js";

const router = express.Router();

/* CREATE USER (TEST HASHING) */
router.post("/test-user", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.create({
      name,
      email,
      password
    });

    res.json({
      message: "User created",
      user
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;