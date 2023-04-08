import React, { useState, useEffect } from "react";
import axios from "axios";

interface Transaction {
  id: number;
  name: string;
  description: string;
  amount: number;
  isDebit: boolean;
  category: string;
  occurrence: string;
  dueBy: Date;
  payee: string;
}

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/transactions")
      .then((response) => setTransactions(response.data))
      .catch((error) => setError(error.message));
  }, []);

  return (
    <div className="transactions-container">
      <h2>Transactions</h2>
      {error && <div className="error">{error}</div>}
      <table className="transactions-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Category</th>
            <th>Frequency</th>
            <th>Due By</th>
            <th>Payee</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.name}</td>
              <td>{transaction.description}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.isDebit ? "Debit" : "Credit"}</td>
              <td>{transaction.category}</td>
              <td>{transaction.occurrence}</td>
              <td>{transaction.dueBy.toDateString()}</td>
              <td>{transaction.payee}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsPage;
