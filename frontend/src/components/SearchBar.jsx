import React, { useState } from "react";
import axios from "axios";

const SearchBar = ({ onResults }) => {   // 👈 accept onResults from parent
  const [query, setQuery] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("https://notebooklm-project.onrender.com/api/notebooks/search", {
        query,
      });

      if (onResults) {
        onResults(res.data.results);  // 👈 send results to Dashboard
      }
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  return (
    <div className="p-4">
      {/* Search form */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          placeholder="Search notebooks..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border rounded p-2 flex-grow"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 rounded"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;


