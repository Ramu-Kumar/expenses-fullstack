import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startEditExpense, startRemoveExpense } from './../../store/actions/expenses';
import ExpenseForm from './../ExpenseForm/ExpenseForm';

class EditExpensePage extends Component {
  onSubmit = (expense) => {
    this.props.startEditExpense(this.props.expense._id, expense);
    this.props.history.push('/dashboard');
  }
  onRemove = () => {
    this.props.startRemoveExpense(this.props.expense._id);
    this.props.history.push('/dashboard');
  }
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Edit expense</h1>
          </div>
        </div>
        <div className="content-container">
          <ExpenseForm
            expense={this.props.expense}
            onSubmit={this.onSubmit}
          />
          <button className="button button--secondary" onClick={this.onRemove}>
            Remove
          </button>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state, props) => {
  return {
    expense: state.expenses.find((expense) => {
      return expense._id === props.match.params.id
    })
  };
};

const mapDispatchToProps = dispatch => {
  return {
    startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
    startRemoveExpense: (id) => dispatch(startRemoveExpense(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);