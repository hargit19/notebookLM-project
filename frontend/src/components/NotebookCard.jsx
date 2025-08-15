export default function NotebookCard({ notebook }) {
  return (
    <div className="relative w-72 h-48 rounded-lg overflow-hidden shadow-lg">
      <img src={notebook.backgroundImageUrl} alt={notebook.title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-4">
        <p className="text-sm text-gray-300">{notebook.authorName}</p>
        <h3 className="text-lg font-bold text-white">{notebook.title}</h3>
        <p className="text-xs text-gray-200">{notebook.topics.join(", ")}</p>
        {notebook.isPaid && <span className="text-yellow-300 font-semibold mt-1">₹{notebook.price}</span>}
      </div>
    </div>
  );
}
