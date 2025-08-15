import { useEffect, useState } from "react";
import API from "../api";
import PublishModal from "../components/PublishModal";
import { useNavigate } from "react-router-dom";
import PaymentDialog from "../components/PaymentDialog";

export default function Dashboard() {
  const [notebooks, setNotebooks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedNotebook, setSelectedNotebook] = useState(null);

  const navigate = useNavigate();

  const fetchNotebooks = async () => {
    try {
      const res = await API.get("/notebooks/all"); // get all published notebooks
      setNotebooks(res.data);
    } catch (err) {
      console.error("Failed to fetch notebooks", err);
    }
  };

  useEffect(() => {
    fetchNotebooks();
  }, []);

  const handleNotebookClick = (nb) => {
    if (nb.isPaid) {
      setSelectedNotebook(nb);
    } else {
      window.open(nb.url, "_blank");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex gap-3">
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Publish Notebook
          </button>
          <button
            onClick={() => navigate("/profile")}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Profile
          </button>
        </div>
      </div>

      {/* Notebook Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {notebooks.map((nb) => (
          <div
  key={nb._id}
  onClick={() => handleNotebookClick(nb)}
  className="relative rounded-xl overflow-hidden shadow-lg cursor-pointer group"
>
  {/* Background image with dark overlay */}
  <div
    className="h-48 bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
    style={{ backgroundImage: `url(${nb.backgroundImageUrl})` }}
  ></div>
  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

  {/* Content */}
  <div className="absolute inset-0 p-4 flex flex-col justify-between">
    {/* Top label */}
    <div className="flex items-center gap-2 text-white text-sm font-medium">
      <span className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
        Notebook LM
      </span>
    </div>

    {/* Middle text */}
    <div>
      <h3 className="text-xl font-bold text-white">{nb.title}</h3>
      <p className="text-white/80 text-sm">by {nb.authorName}</p>
    </div>

    {/* Bottom info */}
    <div className="flex items-center text-white/80 text-xs gap-3">
      <span>{new Date(nb.createdAt).toLocaleDateString()}</span>
      <span>· {nb.topics?.length || 0} topics</span>
      {nb.isPaid && (
        <span className="ml-auto bg-green-600 px-2 py-1 rounded text-white text-xs font-semibold">
          ${nb.price}
        </span>
      )}
    </div>
  </div>
</div>

        ))}
      </div>

      {selectedNotebook && (
        <PaymentDialog
          notebook={selectedNotebook}
          onClose={() => setSelectedNotebook(null)}
        />
      )}

      {showModal && (
        <PublishModal
          onClose={() => {
            setShowModal(false);
            fetchNotebooks(); // refresh list after publishing
          }}
        />
      )}
    </div>
  );
}
