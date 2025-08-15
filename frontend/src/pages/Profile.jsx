import { useEffect, useState } from "react";
import API from "../api";
import NotebookCard from "../components/NotebookCard";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    API.get("/notebooks/me").then(res => setUser(res.data));
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-8 max-w-6xl mx-auto font-sans">
  {/* Profile Header */}
  <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200">
    <h2 className="text-3xl font-bold mb-4 text-gray-900 tracking-tight border-b pb-3">
      My Profile
    </h2>
    <div className="space-y-2 text-gray-800">
      <p>
        <span className="font-semibold">Name:</span> {user.name}
      </p>
      <p>
        <span className="font-semibold">Email:</span> {user.email}
      </p>
    </div>
  </div>

  {/* My Notebooks Section */}
  <div className="mt-10">
    <h3 className="text-2xl font-bold mb-6 text-gray-900 tracking-tight">
      My Notebooks
    </h3>

    {user.notebooks.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {user.notebooks.map((nb) => (
          <div
            key={nb._id}
            onClick={() => window.open(nb.url, "_blank")}
            className="group relative bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
          >
            {/* Background Image */}
            <div
              className="h-48 bg-cover bg-center"
              style={{
                backgroundImage: `url(${nb.backgroundImageUrl || "/placeholder.jpg"})`,
              }}
            ></div>

            {/* Overlay Info */}
            <div className="p-4">
              <h4 className="text-lg font-bold text-gray-900 group-hover:text-black">
                {nb.title}
              </h4>
              <p className="text-sm text-gray-600">by {nb.authorName}</p>
              {nb.topics?.length > 0 && (
                <p className="text-xs mt-2 text-gray-500">
                  {nb.topics.join(", ")}
                </p>
              )}
              {nb.isPaid && (
                <p className="mt-3 font-semibold text-green-600">
                  ${nb.price}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-gray-500 mt-4 italic">
        You haven't published any notebooks yet.
      </p>
    )}
  </div>
</div>

  );
}
