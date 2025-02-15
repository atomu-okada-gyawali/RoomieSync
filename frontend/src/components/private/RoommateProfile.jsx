import React from "react";
import ProfileCard from "./ProfileCard";

function RoommateProfile() {
  const profiles = [
    {
      id: 1,
      name: "John Doe",
      contact: "1234567890",
      email: "john@gmail.com",
      address: "123, 4th Cross, 5th Main, Bangalore",
      isSelf: true,
    },
    {
      id: 2,
      name: "Jane Smith",
      contact: "0987654321",
      email: "jane@gmail.com",
      address: "456, 7th Cross, 8th Main, Bangalore",
      isSelf: false,
    },
  ];

  const profileList = profiles.map((profile) => (
    <li key={profile.id} className="w-full ">
      <ProfileCard
        name={profile.name}
        contact={profile.contact}
        email={profile.email}
        address={profile.address}
        isSelf={profile.isSelf}
      />
    </li>
  ));

  return (
    <div className="h-screen w-full p-4">
      <h1 className="text-2xl font-bold mb-4">Roommate Profiles</h1>
      <div className="h-full w-full">
        <ul className="flex flex-col gap-4 items-center">{profileList}</ul>
      </div>
    </div>
  );
}

export default RoommateProfile;
