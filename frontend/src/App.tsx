import React, { useState, useEffect } from "react";
import { connect, useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Accounts from "./pages/Accounts";
import Transactions from "./pages/Transactions";
import Budgets from "./pages/Budgets";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";

import { getCurrentUser } from './actions/currentUser';

export type User = {
  id: string,
  first_name: string,
  last_name: string,
  username: string,
  email: string,
  password: string,
  updated_at: Date,
  created_at: Date
}

function App(props: any, state: any) {
  const user = useSelector((state: any) => state.user.currentUser)
  const { getCurrentUser } = props

  useEffect(() => {
    getCurrentUser()
  }, []);

  if (!user) return <div>You must login to use this application.</div>

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" Component={Login} >
        </Route>
        <Route path="/signup" Component={Signup}>
        </Route>
        <Route path="/accounts" Component={Accounts}>
        </Route>
        <Route path="/transactions" Component={Transactions}>
        </Route>
        <Route path="/budgets" Component={Budgets}>
        </Route>
        <Route path="/profile" Component={Profile}>
        </Route>
      </Routes>
    </Router >
  );
}

const mapStateToProps = (state: any) => ({
  ...state,
  loggedIn: !!state.currentUser,
})

export default connect(mapStateToProps, { getCurrentUser })(App);
