import React, { Component } from 'react';
import s from './ContactForm.module.css';

import shortid from 'shortid';

export default class ContactForm extends Component {
  state = { name: '', number: '' };
  nameInputId = shortid.generate();
  numberInputUd = shortid.generate();

  handleInputChange = event => {
    const { name, value } = event.currentTarget;
    this.setState({
      [name]: value,
    });
  };
  handleSubmit = event => {
    event.preventDefault();

    this.props.onSubmit(this.state);
    this.reset();
  };
  reset = () => {
    this.setState({
      name: '',
      number: '',
    });
  };
  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor={this.nameInputId}>
            Name
            <input
              className={s.inputForm}
              onChange={this.handleInputChange}
              value={this.state.name}
              type="text"
              name="name"
              id={this.nameInputId}
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />
          </label>
          <label htmlFor={this.numberInputId}>
            Number
            <input
              className={s.inputForm}
              onChange={this.handleInputChange}
              value={this.state.number}
              type="tel"
              name="number"
              id={this.numberInputId}
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
            />
          </label>
          <button className={s.buttonSubmit} type="submit">
            Add contact
          </button>
        </form>
      </>
    );
  }
}
