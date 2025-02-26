import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

function ChoreForm({ isOpen, onClose, dataToUpdate }) {
  const { register, handleSubmit, setValue, watch } = useForm();
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const useWeeklySchedule = watch("useWeeklySchedule", false);
  const selectedDays = watch("selectedDays", []);

  console.log("Data to update: expense form", dataToUpdate);
  useEffect(() => {
    if (dataToUpdate) {
      setValue("name", dataToUpdate.Name);
      if (dataToUpdate.Date) {
        setValue(
          "date",
          new Date(dataToUpdate.Date).toISOString().split("T")[0]
        );
      }
      if (dataToUpdate.Days && dataToUpdate.Days.length > 0) {
        setValue("useWeeklySchedule", true);
        setValue("selectedDays", dataToUpdate.Days);
        console.log("Days:", selectedDays);
      }
    } else {
      setValue("useWeeklySchedule", false);
      setValue("name", "");
      setValue("date", "");
      setValue("selectedDays", []);
    }
  }, [dataToUpdate, setValue]);

  const daysOfWeek = {
    Sunday: "S",
    Monday: "M",
    Tuesday: "T",
    Wednesday: "W",
    Thursday: "T",
    Friday: "F",
    Saturday: "S",
  };

  const toggleWeeklySchedule = () => {
    const newValue = !useWeeklySchedule;
    setValue("useWeeklySchedule", newValue);
    if (!newValue) setValue("selectedDays", []);
  };

  const toggleDaySelection = (day) => {
    const updatedDays = selectedDays.includes(day)
      ? selectedDays.filter((d) => d !== day)
      : [...selectedDays, day];
    setValue("selectedDays", updatedDays);
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError(null);
    try {
      // Get current user data
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

      // Set current user and log the response
      setCurrentUser(userResponse.data.data.Users);
      console.log("User Response:", userResponse.data);
      console.log("Current User Object:", userResponse.data.data.Users);
      console.log("User ID:", userResponse.data.data.Users?.Id);

      // Add user data to form data
      const formData = {
        date: data.date || null,
        ...data,
        days: selectedDays,
        userId: userResponse.data.data.Users.Id,
      };

      console.log("Form Data:", formData);

      if (dataToUpdate) {
        // Update existing chore
        const response = await axios.put(
          `http://localhost:4000/api/chores/${dataToUpdate.Id}`,
          {
            date: data.date || null,
            ...data,
            days: selectedDays,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.status === 200) {
          alert("Chore submitted successfully!");
          onClose();

          fetchChores(); // Refresh the chore list
        }
      } else {
        // Create new chore
        // Input validation
        if (!data.name) {
          alert("Title is required");
          return;
        }
        // Validation: Ensure either date or selectedDays is provided, but not both
        if (!data.date && selectedDays.length === 0) {
          alert("Please provide either a date or select days.");
          return;
        }
        if (data.date && selectedDays.length > 0) {
          alert("Please provide either a date or select days, not both.");
          return;
        }
        const choreResponse = await axios.post(
          "http://localhost:4000/api/chores",
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (choreResponse.status === 201) {
          onClose();
        }
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to create chore. Please try again."
      );
      console.error("API Error:", err.response?.data || err.message);
      if (err.response?.status === 403) {
        console.log("Current token:", localStorage.getItem("token"));
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md"
      >
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Title:
          </label>
          <input
            {...register("name", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Date:
          </label>
          <input
            type="date"
            {...register("date")}
            disabled={useWeeklySchedule}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Weekly Schedule:
          </label>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              className={`rounded-full w-8 h-8 flex items-center justify-center ${
                useWeeklySchedule
                  ? "bg-green-600 text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
              onClick={toggleWeeklySchedule}
            >
              {useWeeklySchedule ? "On" : "Off"}
            </button>
            {Object.keys(daysOfWeek).map((k) => (
              <button
                type="button"
                key={k}
                className={`rounded-full w-8 h-8 flex items-center justify-center ${
                  selectedDays.includes(k)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-gray-700"
                }`}
                onClick={() => toggleDaySelection(k)}
                disabled={!useWeeklySchedule}
              >
                {daysOfWeek[k]}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-purple-600 text-white font-bold py-2 px-4 rounded disabled:bg-purple-300 disabled:cursor-not-allowed"
          >
            {isLoading
              ? dataToUpdate
                ? "Updating..."
                : "Creating..."
              : dataToUpdate
              ? "Update Chore"
              : "+ Add Chore"}
          </button>
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
  );
}

export default ChoreForm;
