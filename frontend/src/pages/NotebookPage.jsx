import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";
import ShareButtons from "../components/ShareButtons"; // ✅ optional

export default function NotebookPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [notebook, setNotebook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotebook = async () => {
      try {
        const res = await API.get(`/notebooks/${id}`);
        setNotebook(res.data);
      } catch (err) {
        console.error("Failed to fetch notebook", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotebook();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-600 animate-pulse">
          Loading notebook...
        </p>
      </div>
    );

  if (!notebook)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-red-500">Notebook not found</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-3 px-6">
        {/* Header */}
<header className="w-full px-6 py-4 flex items-center">
  <h1 className="text-2xl font-bold text-gray-800">NoteShare</h1>
</header>

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        
        {/* Header Section */}
        <div className="relative">
          <img
            src={notebook.backgroundImageUrl}
            alt={notebook.title}
            className="w-full h-72 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-6 left-6 text-white">
            <h1 className="text-4xl font-bold drop-shadow-lg">
              {notebook.title}
            </h1>
            <p className="mt-1 text-lg opacity-90">
              by <span className="font-semibold">{notebook.authorName}</span>
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 space-y-6">
          <p className="text-sm text-gray-500">
            Created on{" "}
            <span className="font-medium">
              {new Date(notebook.createdAt).toLocaleDateString()}
            </span>
          </p>

          <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl">
            <h2 className="text-lg font-semibold mb-2">Topics Covered</h2>
            <p className="text-gray-700">
              {notebook.topics?.length
                ? notebook.topics.join(", ")
                : "No topics available"}
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <a
              href={notebook.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
            >
              Open Notebook
            </a>
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-3 rounded-lg bg-gray-200 text-gray-800 font-medium hover:bg-gray-300 transition"
            >
              ← Back
            </button>
          </div>

          {/* Share Buttons */}
          <div className="mt-6 border-t pt-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">
              Share this Notebook
            </h3>
            <ShareButtons notebook={notebook} />
          </div>

          {notebook.authorEmail && (
            <div className="mt-8 border-t pt-6">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">
                Contact the Author
              </h3>
              <p className="text-gray-700">
                You can contact the author of this notebook at:{" "}
                <a
                  href={`mailto:${notebook.authorEmail}`}
                  className="text-blue-600 hover:underline"
                >
                  {notebook.authorEmail}
                </a>
              </p>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
}

