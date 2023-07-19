import React from 'react';
import AddExpenseForm from './AddExpenseForm';
import ExpenseList from './ExpenseList';

const MainComponent = () => {
  return (
    <div>
      <AddExpenseForm />
      <ExpenseList />
    </div>
  );
};

export default MainComponent;
