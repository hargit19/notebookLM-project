import { useState } from "react";
import API from "../api";

export default function PublishModal({ onClose }) {
  const [form, setForm] = useState({
    title: "",
    url: "",
    topics: "",
    isPaid: false,
    price: 0,
    backgroundImageUrl: ""
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "testtest"); // Cloudinary upload preset

    try {
      setUploading(true);
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/dnrxtm9fo/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      setForm((prev) => ({ ...prev, backgroundImageUrl: data.secure_url }));
    } catch (err) {
      console.error("Image upload failed", err);
    } finally {
      setUploading(false);
    }
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await API.post("/notebooks/publish", {
        ...form,
        topics: form.topics.split(",").map((t) => t.trim()),
      });
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
  <form
    onSubmit={handlePublish}
    className="bg-white p-8 rounded-2xl shadow-2xl w-[420px] font-sans"
  >
    <h2 className="text-2xl font-bold mb-6 text-gray-900 tracking-tight border-b pb-3">
      Publish Notebook
    </h2>

    <input
      type="text"
      placeholder="Title"
      value={form.title}
      onChange={(e) => setForm({ ...form, title: e.target.value })}
      className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-black focus:outline-none"
      required
    />

    <input
      type="url"
      placeholder="Notebook LM Link"
      value={form.url}
      onChange={(e) => setForm({ ...form, url: e.target.value })}
      className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-black focus:outline-none"
      required
    />

    <input
      type="text"
      placeholder="Topics (comma separated)"
      value={form.topics}
      onChange={(e) => setForm({ ...form, topics: e.target.value })}
      className="w-full p-3 border border-gray-300 rounded-lg mb-5 focus:ring-2 focus:ring-black focus:outline-none"
    />

    {/* Cloudinary Upload */}
    <label className="block mb-2 font-medium text-gray-800">
      Background Image:
    </label>
    <input
      type="file"
      accept="image/*"
      onChange={handleImageUpload}
      className="block w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800 mb-3"
    />

    {uploading && (
      <p className="text-sm text-gray-500 mb-3 italic">Uploading...</p>
    )}
    {form.backgroundImageUrl && (
      <img
        src={form.backgroundImageUrl}
        alt="Preview"
        className="h-36 w-full object-cover rounded-lg mb-4 border border-gray-200"
      />
    )}

{/*     <div className="flex items-center gap-3 mb-4">
      <input
        type="checkbox"
        checked={form.isPaid}
        onChange={(e) => setForm({ ...form, isPaid: e.target.checked })}
        className="w-4 h-4 accent-black"
      />
      <label className="text-gray-800">Paid Notebook</label>
    </div>

    {form.isPaid && (
      <input
        type="number"
        placeholder="Price"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-black focus:outline-none"
      />
    )} */}

    <div className="flex justify-end gap-3 pt-3 border-t">
      <button
        type="button"
        onClick={onClose}
        className="px-5 py-2 border border-gray-400 rounded-lg text-gray-700 hover:bg-gray-100 transition"
      >
        Cancel
      </button>
      <button
        type="submit"
        className="px-5 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
        disabled={loading}
      >
        {loading ? "Publishing..." : "Publish"}
      </button>
    </div>
  </form>
</div>

  );
}

