import React from "react";

const ShareButtons = ({ notebook }) => {
  const shareUrl = notebook.url;
  const text = encodeURIComponent(`Check out this notebook: ${notebook.title}`);

  const handleCopyLink = (e) => {
    e.stopPropagation(); // 👈 prevents card click
    navigator.clipboard.writeText(shareUrl).then(() => {
      alert("Link copied to clipboard!");
    });
  };

  const handleClick = (e) => {
    e.stopPropagation(); // 👈 prevents card click
  };

  return (
    <div className="flex gap-2 mt-2" onClick={handleClick}>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
          shareUrl
        )}&text=${text}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
      >
        Twitter
      </a>

      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          shareUrl
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-700 text-white px-2 py-1 rounded text-sm"
      >
        LinkedIn
      </a>

      <a
        href={`https://www.threads.net/intent/post?text=${encodeURIComponent(
          shareUrl
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-black text-white px-2 py-1 rounded text-sm"
      >
        Threads
      </a>

      <button
        onClick={handleCopyLink}
        className="bg-gray-500 text-white px-2 py-1 rounded text-sm"
      >
        Copy Link
      </button>
    </div>
  );
};

export default ShareButtons;
