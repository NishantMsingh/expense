import React, { useContext, useEffect } from 'react';
import CartContext from '../../Store/Cart-context';
import classes from './ExpenseList.module.css';

const ExpenseList = () => {
  const ctx = useContext(CartContext);
  useEffect(() => {

    console.log("Running Twice");

    fetch('https://expense-8205e-default-rtdb.firebaseio.com/expenses.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch expenses');
        } else {
          return response.json();
        }
      })
      .then((data) => {
        const userEmail = localStorage.getItem('email');
        const filteredExpenses = Object.values(data).filter(
          (expense) => expense.email === userEmail
        );
        filteredExpenses.forEach((expense) => {
          ctx.addItem(expense);
        });
        console.log(filteredExpenses);
      })
      .catch((error) => {
        console.error('Error fetching expenses:', error);
      });
  },[]); 

  return (
    <div className={classes.expenseList}>
      <h2>Expense List</h2>
      <ul>
        {ctx.expenses.map((expense, index) => (
          <li key={index} className={classes.expenseItem}>
            <div>
              <span className={classes.label}>Amount:</span> {expense.amount}
            </div>
            <div>
              <span className={classes.label}>Description:</span>{' '}
              {expense.description}
            </div>
            <div>
              <span className={classes.label}>Category:</span>{' '}
              {expense.category}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
