import { useState } from "react";
import ChoreForm from "./ChoreForm";
import { Dialog, DialogPanel } from "@headlessui/react";
import DataTable from "react-data-table-component";

function ChoreTracker() {
  const [cfIsOpen, setcfIsOpen] = useState(false);

  const cfHandleOpen =() =>{
    setcfIsOpen(true);
  }

  const cfHandleClose =() =>{
    setcfIsOpen(false);
  }

  const [chores, setChores] = useState([
    {
      id: 1,
      chore: "Room Cleaning",
      assignee: "Dinesh",
      deadline: "2024/12/12 Sunday",
      status: "Done",
    },
    {
      id: 2,
      chore: "Room Cleaning",
      assignee: "Dinesh",
      deadline: "2024/12/12 Sunday",
      status: "Done",
    },
    {
      id: 3,
      chore: "Room Cleaning",
      assignee: "Dinesh",
      deadline: "2024/12/12 Sunday",
      status: "Done",
    },
  ]);

  const handleFinishChore = (id) => {
    setChores(chores.map(chore => 
      chore.id === id ? { ...chore, status: "Finished" } : chore
    ));
  };

  const handleAddChore = (newChore) => {
    setChores([...chores, newChore]);
  };

  const handleDeleteChore = (id) => {
    setChores(chores.filter((chore) => chore.id !== id));
  };


  function handleEditChore(id){
    console.log(id);
  }

  

  const columns = [
    {
      name: "Chore",
      selector: (row) => row.chore,
      sortable: true,
    },
    {
      name: "Assignee",
      selector: (row) => row.assignee,
      sortable: true,
    },
    {
      name: "Deadline",
      selector: (row) => row.deadline,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-3">
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
          <button
            onClick={() => handleFinishChore(row.id)} // Assuming a handleFinishChore function exists
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
          >
            Finish
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="h-screen w-full p-4">


      <h1 className="text-2xl font-bold mb-4">Chore List</h1>
      <button
        onClick={cfHandleOpen}
        className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
      >
        + Add Chore
      </button>
      <DataTable
        columns={columns}
        data={chores}
        pagination
        highlightOnHover
        striped
      />
      <ChoreForm isOpen={cfIsOpen} onClose={cfHandleClose} />
    </div>
  );
}

export default ChoreTracker;
