import React, { Component } from 'react';
import moment from 'moment';
import {SingleDatePicker} from 'react-dates';

class ExpenseForm extends Component {
  state = {
    description: this.props.expense ? this.props.expense.description : '',
    note: this.props.expense ? this.props.expense.note : '',
    amount: this.props.expense ? (this.props.expense.amount).toString() : '',
    createdAt: this.props.expense ? moment(this.props.expense.createdAt) : moment(), //returns current date
    calendarFocused: false,
    error: ''
  };
  onDateChange = (createdAt) => {
    if (createdAt) {
      this.setState({createdAt});
    }
  }
  onDescriptionChange = (e) => {
    this.setState({description: e.target.value})
  }
  onAmountChange = (e) => {
    const amount = e.target.value;
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState({amount});
    }
  }
  onNoteChange = (e) => {
    this.setState({note: e.target.value});
  }
  onFocusChange = ({focused}) => {
    this.setState({calendarFocused: focused});
  }
  onSubmit = (e) => {
    e.preventDefault();

    if (!this.state.description || !this.state.amount) {
      this.setState({error: 'Please provide description and amount'});
    } else {
      this.setState({error: ''});
      this.props.onSubmit({
        description: this.state.description,
        amount: parseFloat(this.state.amount, 10),
        createdAt: this.state.createdAt.valueOf(), //moment method to get unix
        note: this.state.note
      });
    }
  };
  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.onSubmit}>
          <input 
            type="text"
            placeholder="description"
            autoFocus
            value={this.state.description}
            onChange={this.onDescriptionChange}
          />
          <input 
            type="text"
            placeholder="amount"
            value={this.state.amount}
            onChange = {this.onAmountChange}
          />
          <SingleDatePicker 
            date = {this.state.createdAt}//represents where u want to start on calendar
            onDateChange={this.onDateChange} //fires after new day piked on calendar. setState
            focused = {this.state.calendarFocused} //have to set up state value as bool
            onFocusChange = {this.onFocusChange}
            numberOfMonths = {1}
            isOutsideRange={() => false}
          />
          <textarea
            placeholder="Add a note for your expense (optional)"
            value={this.state.note}
            onChange={this.onNoteChange}
          >
          </textarea>
          <button>Add expense</button>
        </form>
      </div>
    );
  }
};

export default ExpenseForm;