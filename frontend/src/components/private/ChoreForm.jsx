import { useState } from "react";
import { useForm } from "react-hook-form";
// import DatePicker from "react-datepicker";
function ChoreForm({ isOpen, onClose }) {
  const { register, handleSubmit, setValue, watch } = useForm();
  const useWeeklySchedule = watch("useWeeklySchedule", false);
  const selectedDays = watch("selectedDays", []);
  const daysOfWeek = {
    sunday: "S",
    monday: "M",
    tuesday: "T",
    wednesday: "W",
    thursday: "T",
    friday: "F",
    saturday: "S",
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
    console.log(selectedDays);
  };

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    onClose();
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title:
          </label>
          <input
            {...register("title", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Date:
          </label>
          <input type="date" id="birthday" name="birthday" disabled={useWeeklySchedule} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
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

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="assignee"
          >
            Assignee:
          </label>
          <div className="relative">
            <select
              {...register("assignee")}
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="Dinesh">Dinesh</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <button
            type="submit"
            className="bg-purple-600 text-white font-bold py-2 px-4 rounded"
          >
            + Add Chore
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
