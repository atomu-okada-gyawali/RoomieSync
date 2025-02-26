import React, { useState, useEffect } from "react";
import ProfileCard from "./ProfileCard";
import axios from "axios";
import UpdateUserForm from "./UpdateUserForm";

function RoommateProfile() {
  const [uufIsOpen, setUufIsOpen] = useState(false);
  const [profiles, setProfiles] = useState([]);

  const handleOpen = () => {
    setUufIsOpen(true);
    console.log("Edit button clicked, setting uufIsOpen to true");
  };

  const handleClose = () => {
    setUufIsOpen(false);
    console.log("Close button clicked, setting uufIsOpen to false");
  };

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No authentication token found");

    try {
      const userResponse = await axios.get(
        "http://localhost:4000/api/auth/init",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return userResponse;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  };

  const fetchRoommates = async () => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No authentication token found");

    try {
      const userResponse = await fetchUser();
      const roomId = userResponse.data.data.Users.RoomId;
      console.log("RoomId:", roomId);
      const roommatesResponse = await axios.get(
        `http://localhost:4000/api/users/all/${roomId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const formattedData = roommatesResponse.data.data.map((roommate) => ({
        id: roommate.Id,
        name: roommate.Name,
        contact: roommate.Contact,
        email: roommate.Email,
        address: roommate.Address,
        photoAddress: roommate.Photo,
        isSelf: roommate.Id === userResponse.data.data.Users.Id,
      }));
      setProfiles(formattedData);
      console.log("profilelist", profiles);
    } catch (error) {
      console.error("Error fetching roommates:", error);
    }
  };

  useEffect(() => {
    fetchRoommates();
  }, []);

  // Debug state changes
  useEffect(() => {
    console.log("uufIsOpen changed to:", uufIsOpen);
  }, [uufIsOpen]);

  const profileList = profiles.map((profile) => (
    <li key={profile.id} className="w-full">
      <ProfileCard
        id={profile.id}
        name={profile.name}
        contact={profile.contact}
        email={profile.email}
        address={profile.address}
        isSelf={profile.isSelf}
        photoPath={profile.photoAddress}
        openHandler={handleOpen}
      />
    </li>
  ));

  return (
    <div className="h-screen w-full p-4">
      <h1 className="text-2xl font-bold mb-4">Roommate Profiles</h1>
      <div className="h-full w-full">
        <ul className="flex flex-col gap-4 items-center">{profileList}</ul>
      </div>
      {uufIsOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <UpdateUserForm uufIsOpen={uufIsOpen} uufOnClose={handleClose} />
        </div>
      )}
    </div>
  );
}

export default RoommateProfile;
