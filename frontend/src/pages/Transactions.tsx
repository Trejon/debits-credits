import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import moment from 'moment'
import "./Transactions.css"

interface Transaction {
  id: number;
  title: string;
  amount: number;
  credit: string;
  memo: string;
  occurrence_frequency: Date;
  due_by_date: string;
  payee: string;
  user_id: string;
  account_id: string;
  updated_at: Date;
  created_at: Date;
}

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [error, setError] = useState("");

  const user = useSelector((state: any) => state.user.currentUser)

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/v1/${user.id}/transactions`)
      .then((response) => setTransactions(response.data))
      .catch((error) => setError(error.message));
  }, []);

  // Write a function that takes in a number representing all pennies. It then returns how much the amount is in dollars with as little change as possible.
  // For example, 1005 would return $10.05
  const displayTotalAmount = (pennies: number) => {
    console.log("amount", pennies)
    const dollars = Math.floor(pennies / 100);
    pennies %= dollars;
    const cents = Math.floor(pennies).toFixed(2);

    if (dollars >= 1000) {
      return `${dollars.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.${parseInt(cents) < 1 ? "00" : cents}`;
    }

    return `${dollars}.${parseInt(cents) < 1 ? "00" : cents}`;
  }

  return (
    <div className="transactions">
      <h2 className="transactions-heading">Transactions</h2>
      <ul className="transaction-list">
        {transactions.map((transaction) => (
          <li key={transaction.id} className="transaction">
            <div className="left-content">
              <div className="transaction-name">{transaction.title}</div>
              <div className="transaction-description">{transaction.memo}</div>
            </div>
            <div className="right-content">
              <div className="transaction-amount">${displayTotalAmount(transaction.amount)}</div>
              <div className="transaction-memo">Memo: {transaction.memo}</div>
              <div className="transaction-debit">
                {transaction.credit ? "Credit Account" : "Debit Account"}
              </div>
              <div className="transaction-frequency">Frequency: {transaction.occurrence_frequency ? transaction.occurrence_frequency.toString() : "Once"}</div>
              <div className="transaction-due">Due: {moment(transaction.due_by_date).toLocaleString()}</div>
              <div className="transaction-payee">Payee: {transaction.payee}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionsPage;
