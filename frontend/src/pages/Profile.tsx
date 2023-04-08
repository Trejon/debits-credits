import React, { useState, useEffect } from "react";
import axios from "axios";

interface UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  createdAt: Date;
}

const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState<UserProfile>();
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/profile")
      .then((response) => setUserProfile(response.data))
      .catch((error) => setError(error.message));
  }, []);

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      {error && <div className="error">{error}</div>}
      {userProfile && (
        <>
          <div className="profile-row">
            <span className="profile-label">First Name:</span>{" "}
            {userProfile.firstName}
          </div>
          <div className="profile-row">
            <span className="profile-label">Last Name:</span>{" "}
            {userProfile.lastName}
          </div>
          <div className="profile-row">
            <span className="profile-label">Username:</span>{" "}
            {userProfile.username}
          </div>
          <div className="profile-row">
            <span className="profile-label">Joined:</span>{" "}
            {userProfile.createdAt.toDateString()}
          </div>
          <div className="profile-row">
            <span className="profile-label">Duration:</span>{" "}
            {Math.round(
              (new Date().getTime() - new Date(userProfile.createdAt).getTime()) /
                (1000 * 60 * 60 * 24)
            )}{" "}
            days
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
