import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Accounts from "./pages/Accounts";
import Transactions from "./pages/Transactions";
import Budgets from "./pages/Budgets";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" Component={Login}>
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
    </Router>
  );
}

export default App;
