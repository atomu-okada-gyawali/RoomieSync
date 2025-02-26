import { useState, useEffect } from "react";
import ChoreForm from "./ChoreForm";
import DataTable from "react-data-table-component";
import axios from "axios";

function ChoreTracker() {
  const [cfIsOpen, setcfIsOpen] = useState(false);
  const [chores, setChores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const [dataToUpdate, setDataToUpdate] = useState(null);

  console.log("Token being sent:", token);

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
      console.log(JSON.stringify(userResponse));
      return userResponse;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error; // Rethrow the error for further handling
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("useEffect for fetching chores invoked");
    const fetchChores = async () => {
      try {
        const options = { weekday: "long", timeZone: "Asia/Kathmandu" };
        const currentDate = new Date().toISOString().split("T")[0];
        const dayOfTheWeek = new Date(currentDate).toLocaleDateString(
          "en-US",
          options
        );
        console.log(dayOfTheWeek);
        const userData = await fetchUser(token); // Call to fetch user data
        console.log("User data:", userData.data.data.Users.RoomId);
        const response = await axios.get(
          `http://localhost:4000/api/chores/all/${currentDate}/${userData.data.data.Users.RoomId}/${dayOfTheWeek}`,

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(
          `http://localhost:4000/api/chores/all/${currentDate}/${userData.data.data.Users.RoomId}/${dayOfTheWeek}`
        );
        console.log(response);
        const formattedChores = response.data.map((chore) => ({
          id: chore.Id,
          chore: chore.Name,
          assignee: chore.User ? chore.User.Name : "Unassigned",
          deadline: chore.Date ? chore.Date.split("T")[0] : "No deadline",
          status: "pending",
        }));
        setChores(formattedChores);
      } catch (err) {
        setError(err.message || "Failed to fetch chores");
      } finally {
        setIsLoading(false);
      }
    };
    fetchChores();
  }, []);

  const cfHandleOpen = () => {
    setcfIsOpen(true);
  };

  const cfHandleClose = () => {
    // setDataToUpdate(null);
    setcfIsOpen(false);
  };

  const handleFinishChore = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:4000/api/chores/${id}`,
        { status: "Finished" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setChores(
        chores.map((chore) =>
          chore.id === id ? { ...chore, status: "Finished" } : chore
        )
      );
    } catch (error) {
      console.error("Error finishing chore:", error);
      setError("Failed to finishing chore");
    }
  };

  const handleAddChore = () => {
    setDataToUpdate(null);

    cfHandleOpen();
  };

  const handleDeleteChore = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:4000/api/chores/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setChores(chores.filter((chore) => chore.id !== id));
      alert("Chore deleted successfully!");
    } catch (error) {
      console.error("Error deleting chore:", error);
      setError("Failed to delete chore");
    }
  };

  const handleEditChore = async (id) => {
    let response = await axios.get(`http://localhost:4000/api/chores/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setDataToUpdate(response.data);
    console.log("Data to update:", JSON.stringify(dataToUpdate));
    cfHandleOpen();
  };

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
            onClick={() => handleEditChore(row.id)}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
          >
            Edit
          </button>
          <button
            onClick={() => handleFinishChore(row.id)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
          >
            Finish
          </button>
        </div>
      ),
    },
  ];

  if (isLoading) {
    return <div>Loading chores...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="h-screen w-full p-4">
      <h1 className="text-2xl font-bold mb-4">Chore List</h1>
      <button
        onClick={handleAddChore}
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
      <ChoreForm
        isOpen={cfIsOpen}
        onClose={cfHandleClose}
        dataToUpdate={dataToUpdate}
      />
    </div>
  );
}

export default ChoreTracker;
