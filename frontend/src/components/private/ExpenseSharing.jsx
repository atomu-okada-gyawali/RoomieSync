import React, { useState } from "react";
import DataTable from "react-data-table-component";
import ExpenseForm from "./ExpenseForm";
import SharedList from "./SharedList";
const ExpenseSharing = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleOpen = () => {
    setIsModalOpen(true);
  };
  const [slisOpen, setslisOpen] = useState(false);

  const slHandleOpen = () => {
    setslisOpen(true);
  };

  const slHandleClose = () => {
    setslisOpen(false);
  };
  const [data, setData] = useState([
    {
      id: 1,
      item: "Rent Fee",
      paidBy: "Ronak",
      amount: 1000000,
      selected: true,
    },
    {
      id: 2,
      item: "Utilities",
      paidBy: "Dinesh",
      amount: 50000,
      selected: false,
    },
    {
      id: 3,
      item: "Groceries",
      paidBy: "Dinesh",
      amount: 20000,
      selected: false,
    },
    {
      id: 4,
      item: "Internet",
      paidBy: "Ronak",
      amount: 30000,
      selected: true,
    },
  ]);

  const columns = [
    {
      name: "Item",
      selector: (row) => row.item,
      sortable: true,
    },
    {
      name: "Paid By",
      selector: (row) => row.paidBy,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
      sortable: true,
    },
    {
      name: "Selected",
      cell: (row) => (
        <input
          type="checkbox"
          checked={row.selected}
          className="form-checkbox"
          onChange={() => {
            // Logic to handle checkbox change
            // This could involve updating the state or data
          }}
        />
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => handleDeleteChore(row.id)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
          >
            Delete
          </button>
          <button
            onClick={() => handleDeleteChore(row.id)}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
          >
            Edit
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="h-screen w-full p-4">
      <div className="w-full h-screen  flex flex-col">
          <h1 className="text-2xl font-bold mb-4">Expense Sharing</h1>
        <div className="flex space-x-4 mb-8">
          <button
            className="bg-purple-500 hover:bg-purple-700 text-white px-4 py-2 rounded"
            onClick={handleOpen}
          >
            + Add Expense
          </button>
          <button
            className="bg-purple-500 hover:bg-purple-700 text-white px-4 py-2 rounded"
            onClick={slHandleOpen}
          >
            Settle Expenses
          </button>
        </div>
        <DataTable
          columns={columns}
          data={data}
          pagination
          highlightOnHover
          striped
        />
      </div>
      <ExpenseForm isOpen={isModalOpen} onClose={handleClose} />
      <SharedList isOpen={slisOpen} onClose={slHandleClose} />
    </div>
  );
};

export default ExpenseSharing;
