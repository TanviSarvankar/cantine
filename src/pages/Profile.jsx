import React from "react";
import "../styles/profile.css";
import { FaCog, FaBell, FaHeart, FaSignOutAlt } from "react-icons/fa";

const Profile = () => {
  const user = {
    name: "",
    email: "",
    initial: "",
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">Profile 👋</h2>

      {/* User Card */}
      <div className="profile-card">
        <div className="avatar">{user.initial}</div>
        <div>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
      </div>

      {/* Options */}
      <div className="profile-options">
        <div className="option">
          <FaCog className="icon" />
          <span>Account Settings</span>
        </div>

        <div className="option">
          <FaBell className="icon" />
          <span>Notifications</span>
        </div>

        <div className="option">
          <FaHeart className="icon" />
          <span>Favorites</span>
        </div>
      </div>

      {/* Logout Button */}
      <button className="logout-btn">
        <FaSignOutAlt /> Logout
      </button>
    </div>
  );
};

export default Profile;