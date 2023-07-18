import React, { useState } from 'react';
import classes from './AddExpenseForm.module.css';

const AddExpenseForm = () => {
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    category: '',
  });

  const categories = ['Food', 'Petrol', 'Salary', 'Utilities', 'Other']; 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // You can add your logic here to save the expense data to a database or perform any other action.
    // For now, we'll just log the form data to the console.
  };

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>Add Daily Expense</h2>
      <form className={classes.form} onSubmit={handleSubmit}>
        <div className={classes.formGroup}>
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            name="amount"
            id="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>
        <div className={classes.formGroup}>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className={classes.formGroup}>
          <label htmlFor="category">Category:</label>
          <select
            name="category"
            id="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className={classes.addButton}>
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default AddExpenseForm;
