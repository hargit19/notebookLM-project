import React from "react";

const ShareButtons = ({ notebook }) => {
  // Build your app’s dynamic URL (frontend detail page)
  const shareUrl = `${window.location.origin}/noteshare/notebooks/${notebook._id}`;

  // 👇 Build text with notebook + community message
  const message = `
Check out this notebook: ${notebook.title}
${shareUrl}

This notebook was created by NoteShare (https://notebook-lm-project-k5ax.vercel.app/).

#NoteShare #NoteSharecommunity
`;

  const encodedMessage = encodeURIComponent(message);

  const handleCopyLink = (e) => {
    e.stopPropagation(); // 👈 prevents card click
    navigator.clipboard.writeText(message).then(() => {
      alert("Link copied to clipboard!");
    });
  };

  const handleClick = (e) => {
    e.stopPropagation(); // 👈 prevents card click
  };

  return (
    <div className="flex gap-2 mt-2" onClick={handleClick}>
      {/* Twitter */}
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
      >
        Twitter
      </a>

      {/* LinkedIn */}
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          shareUrl
        )}&summary=${encodedMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-700 text-white px-2 py-1 rounded text-sm"
      >
        LinkedIn
      </a>

      {/* Threads */}
      <a
        href={`https://www.threads.net/intent/post?text=${encodedMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-black text-white px-2 py-1 rounded text-sm"
      >
        Threads
      </a>

      {/* Copy link */}
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


