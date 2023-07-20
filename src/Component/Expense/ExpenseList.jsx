import React, { useContext, useEffect, useState } from 'react';
import CartContext from '../../Store/Cart-context';
import classes from './ExpenseList.module.css';

const ExpenseList = () => {
  const ctx = useContext(CartContext);
  const [once,setonce]=useState(true);
  useEffect(() => {

    console.log("Running Twice");
  if(once)
  {
    setonce(false);
    fetch('https://expense-8205e-default-rtdb.firebaseio.com/expenses.json')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch expenses');
      } else {
        return response.json();
      }
    })
    .then((data) => {
      for(const key in data)
      {
        if (data.hasOwnProperty(key)) {
          const value = data[key];
          let temp={...value,id:key};
          ctx.addItem(temp);
        }
      }
    })
    .catch((error) => {
      console.log('Data not found');
    }); 
}},[]); 


const deleteExpenseHandler=(value)=>{

  fetch(`https://expense-8205e-default-rtdb.firebaseio.com/expenses/${value.id}.json`, {
    method: 'DELETE',
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to delete expense');
      }
      console.log("Deleted Successfully");
      ctx.deleteItem(value.id);
    })
    .catch((error) => {
     console.log('Error deleting expense:', error);
    });
}





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
              <div>
              <span className={classes.label}>Date:</span>{' '}
              {expense.date}
            </div>
            <div>
              <button className={classes.buttonedit} >Edit</button>
              <button className={classes.buttondel} onClick={() => deleteExpenseHandler(expense)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
