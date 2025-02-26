import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const ExpenseSharing = ({ isOpen, onClose, selectedExpenses }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function confirmHandler(idArr) {
    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:4000/api/shared-expenses/pay`,
        { ids: idArr.map((id) => parseInt(id)) }, // Ensure IDs are integers
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        // Handle successful payment
        console.log("Payment successful");
        onClose(); // Close the modal
        // Optionally refresh data or show success message
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Payment failed. Please try again."
      );
      console.error("Payment error:", err);
    } finally {
      setIsLoading(false);
    }
  }
  if (!isOpen) return null; // Render nothing if not open

  function settleExpenses(entries) {
    let balanceMap = new Map();

    // Calculate net balance for each payer
    let totalExpense = 0;
    for (let { name, expense } of entries) {
      balanceMap.set(name, (balanceMap.get(name) || 0) + expense);
      totalExpense += expense;
    }

    let numPeople = balanceMap.size;
    let fairShare = totalExpense / numPeople;

    // Convert balances to an array and adjust for fair share
    let balances = [];
    for (let [name, amount] of balanceMap) {
      balances.push({ name, balance: amount - fairShare });
    }

    // Sort payers into debtors (negative balance) and creditors (positive balance)
    let debtors = balances
      .filter((p) => p.balance < 0)
      .sort((a, b) => a.balance - b.balance);
    let creditors = balances
      .filter((p) => p.balance > 0)
      .sort((a, b) => b.balance - a.balance);

    let transactions = [];
    let i = 0,
      j = 0;
    while (i < debtors.length && j < creditors.length) {
      let debtor = debtors[i];
      let creditor = creditors[j];
      let amount = Math.min(-debtor.balance, creditor.balance);

      transactions.push({ from: debtor.name, to: creditor.name, amount });

      debtor.balance += amount;
      creditor.balance -= amount;

      if (debtor.balance === 0) i++;
      if (creditor.balance === 0) j++;
    }

    return transactions;
  }

  const settledExpense = settleExpenses(selectedExpenses);
  console.log(settledExpense);
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Expense Sharing</h2>
        <div className="expense-list mb-4">
          {settleExpenses(selectedExpenses).map((expense, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b py-2"
            >
              <span>
                {expense.from} → {expense.to}
              </span>
              <span>{expense.amount}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-500 transition"
          >
            Back
          </button>
          <button
            onClick={() => {
              console.log("Confirm clicked!");
              let idArr = selectedExpenses.map((expense) => expense.id);
              console.log("Selected expenses:", idArr);
              confirmHandler(idArr);
            }}
            className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-500 transition"
          >
            {isLoading ? "Processing..." : "Confirm"}
          </button>
          {error && <div className="text-red-500 mt-2 text-sm">{error}</div>}
        </div>
      </div>
    </div>
  );
};
 
export default ExpenseSharing;
