import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

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

  const user = useSelector((state: any) => state.user.currentUser)

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/v1/get_current_user")
      .then((response) => setUserProfile(response.data))
      .catch((error) => setError(error.message));
  }, []);

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      {error && <div className="error">{error}</div>}
      {user && (
        <>
          <div className="profile-row">
            <span className="profile-label">First Name:</span>{" "}
            {user.first_name}
          </div>
          <div className="profile-row">
            <span className="profile-label">Last Name:</span>{" "}
            {user.last_name}
          </div>
          <div className="profile-row">
            <span className="profile-label">Username:</span>{" "}
            {user.username}
          </div>
          <div className="profile-row">
            <span className="profile-label">Joined:</span>{" "}
            {user.created_at?.toString()}
          </div>
          <div className="profile-row">
            <span className="profile-label">Duration:</span>{" "}
            {Math.round(
              (new Date().getTime() - new Date(user.created_at).getTime()) /
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
