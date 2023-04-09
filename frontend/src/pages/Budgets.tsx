import React, { useState, useEffect } from "react";
import axios from "axios";

interface Budget {
  id: number;
  name: string;
  amount: number;
  category: string;
}

const BudgetsPage = () => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/v1/42a5d6f1-b874-4f65-b53d-63398d6a8d6d/budgets")
      .then((response) => setBudgets(response.data))
      .catch((error) => setError(error.message));
  }, []);

  return (
    <div className="budgets-container">
      <h2>Budgets</h2>
      {error && <div className="error">{error}</div>}
      <table className="budgets-table">
        <thead>
          <tr>
            <th>Budget Name</th>
            <th>Amount</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {budgets.map((budget) => (
            <tr key={budget.id}>
              <td>{budget.name}</td>
              <td>{budget.amount}</td>
              <td>{budget.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BudgetsPage;
