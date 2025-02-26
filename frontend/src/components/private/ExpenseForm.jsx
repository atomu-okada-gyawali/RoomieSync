import { useForm } from "react-hook-form";
import axios from "axios"; // Import axios for API requests
import { useState, useEffect } from "react";

function ExpenseForm({ isOpen, onClose, dataToUpdate }) {
  console.log(dataToUpdate);
  const { register, handleSubmit, setValue } = useForm();
  useEffect(() => {
    console.log("Data to update: expense form", dataToUpdate);
    if (dataToUpdate != null) {
      setValue("item", dataToUpdate.item);
      setValue("amount", dataToUpdate.amount);
    } else {
      setValue("item", "");
      setValue("amount", "");
    }
  }, [dataToUpdate, setValue]);

  const onSubmit = async (data) => {
  // Input validation
  if (!data.item) {
    alert("Item is required");
    return;
  }
  if (!data.amount || isNaN(data.amount)) {
    alert("Amount must be a valid number");
    return;
  }
  // Additional validation for react-hook-form
  if (!data.amount || data.amount <= 0) {
    alert("Amount must be greater than zero");
    return;
  }
    try {
      const token = localStorage.getItem("token");
      console.log("Token being sent:", token);
  
      if (!token) {
        throw new Error("No authentication token found");
      }
  
      const userResponse = await axios.get(
        "http://localhost:4000/api/auth/init",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const agentId = userResponse.data.data.Users.Id;
  
      if (dataToUpdate) {
        // If dataToUpdate is truthy, perform a PUT request
        await axios.put(
          `http://localhost:4000/api/shared-expenses/${dataToUpdate.id}`,
          {
            name: data.item,
            amount: data.amount,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        // Otherwise, perform a POST request
        await axios.post(
          "http://localhost:4000/api/shared-expenses",
          {
            name: data.item,
            amount: data.amount,
            agentId: agentId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
  
      alert("Expense submitted successfully!");
      onClose();
      fetchExpenses(); // Refresh the expense list
    } catch (error) {
      console.error("Error submitting expense:", error);
    }
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-xs">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name" // Update htmlFor to match the new field name
            >
              Item:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="item"
              type="text"
              placeholder=""
              {...register("item")}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="amount"
            >
              Amount:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="amount"
              type="text"
              placeholder=""
              {...register("amount")}
            />
          </div>
          <div className="mb-4">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M7 10l5 5 5-5H7z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {!dataToUpdate ? "+ Add Expense" : "Update Expense"}
            </button>
          </div>
          <div className="flex items-center justify-center mt-4">
            <button
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default ExpenseForm;
