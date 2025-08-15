import mongoose from "mongoose";

const notebookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    authorName: { type: String, required: true },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    url: { type: String, required: true },
    backgroundImageUrl: { type: String },
    topics: [{ type: String }],
    isPaid: { type: Boolean, default: false },
    price: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model("Notebook", notebookSchema);
