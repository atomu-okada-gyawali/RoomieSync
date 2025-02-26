import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import ExpenseForm from "./ExpenseForm";
import SharedList from "./SharedList";

const ExpenseSharing = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data2Update, setdata2Update] = useState(null);
  const resetHandler = () => {
    setdata2Update(null);
  };
  const handleClose = () => {
    setIsModalOpen(false);
  };
  const deleteHandle = (id) => {
    try {
      const token = localStorage.getItem("token");
      console.log("Token being sent:", token);
      if (!token) {
        throw new Error("No authentication token found");
      }
      axios.delete(`http://localhost:4000/api/shared-expenses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Expense deleted successfully!");
    } catch (error) {
      console.error("Error deleting expenses:", error);
    }
  };
  const addExpenseHandler = () => {
    setdata2Update(null);
    console.log(data2Update);
    handleOpen();
  };
  const handleOpen = () => {
    setIsModalOpen(true);
  };
  const [sExpenses, setSExpenses] = useState([]);

  const [slisOpen, setslisOpen] = useState(false);
  const slHandleOpen = () => {
    console.log("slHandleOpen called"); // Debugging log
    const selectedExpenses = data
      .filter((expense) => expense.selected) // Filter selected expenses
      .filter((expense) => expense.selected) // Filter selected expenses
      .map((expense) => ({
        id: expense.id, // Ensure Id is correctly set
        name: expense.paidBy, // Use item for Name
        expense: parseInt(expense.amount), // Convert Amount to Integer
      }));
    console.log("Selected Expenses before setting state:", selectedExpenses); // Log the selected expenses before setting state
    console.log("Selected Expenses:", selectedExpenses); // Debugging log to check the structure of selected expenses
    setSExpenses(selectedExpenses); // Set selected expenses to state
    setslisOpen(true); // Open the SharedList modal
  };

  const slHandleClose = () => {
    setslisOpen(false);
  };

  const fetchUser = async (token) => {
    if (!token) {
      throw new Error("No authentication token found");
    }

    try {
      const userResponse = await axios.get(
        "http://localhost:4000/api/auth/init",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return userResponse;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error; // Rethrow the error for further handling
    }
  };

  const fetchExpenses = async () => {
    const token = localStorage.getItem("token"); // Get token from localStorage
    if (!token) {
      throw new Error("No authentication token found");
    }

    const userResponse = await fetchUser(token); // Fetch user data first
    const roomId = userResponse.data.data.Users.RoomId; // Get RoomId from user data
    try {
      const expensesResponse = await axios.get(
        `http://localhost:4000/api/shared-expenses/all/${roomId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Fetched expenses:", JSON.stringify(expensesResponse.data));
      const formattedData = expensesResponse.data.map((expense) => ({
        id: expense.Id,
        item: expense.Name,
        paidBy: expense.User.Name,
        amount: expense.Amount,
        selected: false, // Default value for selected
      }));
      setData(formattedData); // Update state with formatted expenses
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Get token from localStorage
    console.log("Token retrieved:", token); // Log the token
    fetchExpenses(token);
  }, []); // Empty dependency array to run once on mount

  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
      sortable: true,
    },

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
            const updatedData = data.map((item) => {
              if (item.item === row.item) {
                return { ...item, selected: !item.selected }; // Toggle selected state
              }
              return item;
            });
            setData(updatedData); // Update state with new data
            const selectedExpenses = updatedData
              .filter((expense) => expense.selected) // Filter selected expenses
              .map((expense) => ({
                id: expense.id,
                name: expense.item, // Use item for Name
                expense: parseInt(expense.amount), // Convert Amount to Integer
              }));
            setSExpenses(selectedExpenses); // Update selected expenses state
          }}
        />
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => {
              deleteHandle(row.id);
            }}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
          >
            Delete
          </button>
          <button
            onClick={() => {
              const rowData = {
                id: row.id,
                item: row.item,
                paidBy: row.paidBy,
                amount: row.amount,
              };
              setdata2Update(rowData);
              setIsModalOpen(true);
              console.log("Row data as JSON:", JSON.stringify(rowData));
            }}
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
      <div className="w-full h-screen flex flex-col">
        <h1 className="text-2xl font-bold mb-4">Expense Sharing</h1>
        <div className="flex space-x-4 mb-8">
          <button
            className="bg-purple-500 hover:bg-purple-700 text-white px-4 py-2 rounded"
            onClick={addExpenseHandler}
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
      <ExpenseForm
        isOpen={isModalOpen}
        onClose={handleClose}
        dataToUpdate={data2Update}
        reset={resetHandler}
      />
      <SharedList
        isOpen={slisOpen}
        onClose={slHandleClose}
        selectedExpenses={sExpenses}
      />
    </div>
  );
};

export default ExpenseSharing;
