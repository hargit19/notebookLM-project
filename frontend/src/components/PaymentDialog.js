import React from "react";

export default function PaymentDialog({ notebook, onClose }) {
  if (!notebook) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-96 animate-fadeIn">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Buy This Notebook
        </h2>
        <p className="text-gray-700 mb-2">
          You are about to purchase:
        </p>
        <p className="text-lg font-semibold mb-4">{notebook.title}</p>
        <p className="text-green-600 font-bold text-xl mb-6">
          ${notebook.price}
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              alert("Payment gateway integration goes here.");
              onClose();
            }}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
