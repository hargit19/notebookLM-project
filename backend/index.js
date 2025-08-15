import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import notebookRoutes from "./routes/notebook.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/notebooks", notebookRoutes);

// MongoDB connection
mongoose.connect("mongodb+srv://hardikadvani1910:" + process.env.MONGODB_PASS + "@cluster0.whtnssh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(process.env.PORT || 5000, () =>
        console.log(`🚀 Server running on port ${process.env.PORT || 5000}`)
    );
})
.catch(err => console.error("❌ MongoDB connection error:", err));
