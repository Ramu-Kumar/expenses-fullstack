import axios from 'axios';

export const addExpense = (expense) => {
  return {
    type: 'ADD_EXPENSE',
    expense
  };
};

export const startAddExpense = (expenseData) => { 
  return (dispatch, getState) => {
    axios.post('/api/expenses', expenseData)
    .then(({data}) => {
      dispatch(addExpense(data));
    })
    .catch(err => {
      alert('Was unable to add expense');
    });
  };
};

export const editExpense = (id, updates) => {
  return {
    type: 'EDIT_EXPENSE',
    id,
    updates
  };
};

export const removeExpense = (id) => {
  return {
    type: 'REMOVE_EXPENSE',
    id
  };
};

export const setExpenses = (expenses) => {
  return {
    type: 'SET_EXPENSES',
    expenses
  };
};

export const startSetExpenses = () => {
  return dispatch => {
    axios.get('/api/expenses')
    .then(({data}) => {
      dispatch(setExpenses(data));
    })
    .catch((error) => {
      alert('could not fetch expenses');
    });
};
};