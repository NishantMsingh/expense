import React, { useContext, useState } from 'react';
import classes from './AddExpenseForm.module.css';
import CartContext from '../../Store/Cart-context';
const AddExpenseForm = () => {
  const ctx=useContext(CartContext);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.email=localStorage.getItem("email");
    console.log(formData);

    fetch('https://expense-8205e-default-rtdb.firebaseio.com/expenses.json', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Expense added successfully!', data);
        ctx.addItem(formData); // Optionally, you can add the expense to the context as well.
        alert('Expense Added Successfully');
      })
      .catch((error) => {
        console.error('Error adding expense:', error);
        alert('Error adding expense');
      });
      setFormData({
        amount: '',
        description: '',
        category: '',
      })
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
