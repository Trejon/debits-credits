import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { login } from '../actions/currentUser';

interface User {
  username: string;
  password: string;
}

const LoginPage = (props: any) => {
  const [user, setUser] = useState<User>({ username: "", password: "" });
  const [error, setError] = useState("");
  const history = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value)
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // useEffect(() => {
  //   console.log(user);
  // }, [user]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.login(user, history);
    // console.log(user);
    // Check if the username and password are correct
    // if (user.username === "example" && user.password === "password") {
    //   // Redirect to the accounts page
    //   history("/accounts");
    // } else {
    //   // Show an error message
    //   setError("Invalid username or password");
    // }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
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
          Login
        </button>
      </form>
    </div>
  );
};

export default connect(null, { login })(LoginPage);
