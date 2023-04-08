import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

interface Account {
  id: number;
  accountName: string;
  balance: number;
  bankName: string;
  debit: boolean;
  symbol: string;
  transactions: Transaction[];
}

interface Transaction {
  id: number;
  date: string;
  description: string;
  amount: number;
}

const AccountsPage = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [error, setError] = useState("");

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5000/accounts")
  //     .then((response) => setAccounts(response.data))
  //     .catch((error) => setError(error.message));
  // }, []);

  return (
    <div className="accounts-container">
      <h2>Accounts</h2>
      {error && <div className="error">{error}</div>}
      <table className="accounts-table">
        <thead>
          <tr>
            <th>Account Name</th>
            <th>Balance</th>
            <th>Bank Name</th>
            <th>Debit?</th>
            <th>Transactions</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={account.id}>
              <td>{account.accountName}</td>
              <td>{account.balance}</td>
              <td>{account.bankName}</td>
              <td>{account.debit ? account.symbol : ""}</td>
              <td>
                <Link to={`/accounts/${account.id}/transactions`}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AccountsPage;
