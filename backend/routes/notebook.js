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

router.put("/edit/:id", protect, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, url, backgroundImageUrl, topics, isPaid, price } = req.body;

    // Find and verify ownership
    const notebook = await Notebook.findById(id);
    if (!notebook) {
      return res.status(404).json({ message: "Notebook not found" });
    }

    if (notebook.authorId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized to edit this notebook" });
    }

    // Update fields
    notebook.title = title || notebook.title;
    notebook.url = url || notebook.url;
    notebook.backgroundImageUrl = backgroundImageUrl || notebook.backgroundImageUrl;
    notebook.topics = topics || notebook.topics;
    notebook.isPaid = isPaid ?? notebook.isPaid;
    notebook.price = isPaid ? price : 0;

    await notebook.save();
    res.status(200).json({ message: "Notebook updated successfully", notebook });
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

router.get("/:id", async (req, res) => {
  try {
    const notebook = await Notebook.findById(req.params.id)
      .populate("authorId", "name email"); // fetch name + email

    if (!notebook) {
      return res.status(404).json({ error: "Notebook not found" });
    }

    res.json({
      ...notebook.toObject(),
      authorName: notebook.authorId.name,
      authorEmail: notebook.authorId.email,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;




