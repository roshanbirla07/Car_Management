import React from "react";

const ProfilePage = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold">Owner Profile</h1>
      <div className="mt-4">
        <p className="text-lg">Name: Owner Name</p>
        <p className="text-lg">Email: owner@example.com</p> {/* Example */}
        {/* Add more profile details here */}
      </div>
    </div>
  );
};

export default ProfilePage;
