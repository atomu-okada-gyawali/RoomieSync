import React, { useState } from "react";
import DataTable from "react-data-table-component";

const ExpenseWishList = () => {
  const [data, setData] = useState([
    { id: 1, item: "Rent Fee" },
    { id: 2, item: "Rent Fee" },
    { id: 3, item: "Rent Fee" },
  ]);

  const columns = [
    {
      name: "Item",
      selector: (row) => row.item,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-2">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
            onClick={() => handleDelete(row.id)}
          >
            Delete
          </button>{" "}
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
            onClick={() => handleEdit(row.id)}
          >
            Edit
          </button>{" "}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
            onClick={() => handleFinish(row.id)}
          >
            Finish
          </button>{" "}
          <button
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded"
            onClick={() => handleMoveToSharing(row.id)}
          >
            Move to Sharing
          </button>
        </div>
      ),
    },
  ];

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const handleEdit = (id) => {
    // Implement logic to edit the selected row
    console.log(`Edit item with id: ${id}`);
  };

  const handleFinish = (id) => {
    // Implement logic to mark the item as finished
    console.log(`Finish item with id: ${id}`);
  };

  const handleMoveToSharing = (id) => {
    // Implement logic to move the item to sharing
    console.log(`Move item with id: ${id} to sharing`);
  };

  return (
    <div className="h-screen w-full p-4">
      <h1 className="text-2xl font-bold mb-4">Expenses / Wishlists</h1>
      <button
        // onClick={cfHandleOpen}
        className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
      >
        + Add Expense
      </button>
      <DataTable columns={columns} data={data} pagination />
    </div>
  );
};

export default ExpenseWishList;
