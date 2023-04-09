import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect, useSelector } from "react-redux";
import { getCurrentUser } from "../actions/currentUser";

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

const AccountsPage = (props: any) => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [error, setError] = useState("");
  const user = useSelector((state: any) => state.user.currentUser)

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/v1/${user.id}/accounts`)
      .then((response) => setAccounts(response.data))
      .catch((error) => setError(error.message));
  }, []);

  const setCurrentUser = (event: any) => {
    props.getCurrentUser();
  }

  return (
    <div className="accounts-container">
      <button onClick={setCurrentUser}>Test redux action</button>
      <pre>
        {
          JSON.stringify(props)
        }
      </pre>
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

const mapStateToProps = (state: any) => ({
  ...state
})

const mapDispatchToProps = (dispatch: any) => ({
  setCurrentUser: () => dispatch(getCurrentUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountsPage);
