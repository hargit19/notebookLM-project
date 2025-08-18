import express from "express";
import Notebook from "../models/Notebook.js";
import User from "../models/User.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Publish notebook
router.post("/publish", protect, async (req, res) => {
    try {
        const { title,url, backgroundImageUrl, topics, isPaid, price } = req.body;
        const notebook = new Notebook({
            title,
            authorName: req.user.name,
            authorId: req.user._id,
            url,
            backgroundImageUrl,
            topics,
            isPaid,
            price: isPaid ? price : 0
        });
        await notebook.save();

        req.user.notebooks.push(notebook._id);
        await req.user.save();

        res.status(201).json({ message: "Notebook published", notebook });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// View all notebooks
router.get("/all", async (req, res) => {
    try {
        const notebooks = await Notebook.find().sort({ createdAt: -1 });
        res.json(notebooks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/search", async (req, res) => {
  const { query } = req.body;

if (!query) {
  return res.status(400).json({ error: "Search query is required" });
}

try {
  const notebooks = await Notebook.find({
    title: { $regex: query, $options: "i" }, // case-insensitive search
  });

  return res.json({ results: notebooks });  // ✅ send back results
} catch (err) {
  console.error(err);
  return res.status(500).json({ error: "Server error" });
}

});

// View my notebooks
router.get("/my", protect, async (req, res) => {
    try {
        const notebooks = await Notebook.find({ authorId: req.user._id });
        res.json(notebooks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// View my details
router.get("/me", protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate("notebooks");
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;

