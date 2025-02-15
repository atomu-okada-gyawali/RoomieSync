import React from "react";

function SharedList({ isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Expense Sharing</h2>
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span>Ronak</span>
            <span>→</span>
            <span>Hridaya</span>
            <span>500</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span>Ronak</span>
            <span>→</span>
            <span>Hridaya</span>
            <span>500</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span>Ronak</span>
            <span>→</span>
            <span>Hridaya</span>
            <span>500</span>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={onClose}
          >
            Back
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default SharedList;
