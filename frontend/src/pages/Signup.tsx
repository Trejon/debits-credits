import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

const SignupPage = () => {
  const [user, setUser] = useState<User>({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const history = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Check if the user entered all the required fields
    if (!user.firstName || !user.lastName || !user.username || !user.password) {
      setError("Please fill in all the fields");
    } else {
      // Save the user's information to the database
      // Redirect to the accounts page
      history("/accounts");
    }
  };

  return (
    <div className="form-container">
      <h2>Sign Up</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <label className="form-label" htmlFor="firstName">
          First Name
        </label>
        <input
          className="form-input"
          type="text"
          name="firstName"
          id="firstName"
          value={user.firstName}
          onChange={handleChange}
          required
        />
        <label className="form-label" htmlFor="lastName">
          Last Name
        </label>
        <input
          className="form-input"
          type="text"
          name="lastName"
          id="lastName"
          value={user.lastName}
          onChange={handleChange}
          required
        />
        <label className="form-label" htmlFor="username">
          Username
        </label>
        <input
          className="form-input"
          type="text"
          name="username"
          id="username"
          value={user.username}
          onChange={handleChange}
          required
        />
        <label className="form-label" htmlFor="password">
          Password
        </label>
        <input
          className="form-input"
          type="password"
          name="password"
          id="password"
          value={user.password}
          onChange={handleChange}
          required
        />
        <button className="form-button" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
