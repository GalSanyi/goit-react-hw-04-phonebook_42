import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts } from 'redux/contacts/contacts-selectors';
import { addContact } from 'redux/contacts/contactsSlice';

import s from './ContactForm.module.css';
import shortid from 'shortid';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const handleInputChange = e => {
    const { name, value } = e.target;

    switch (name) {
      case 'name':
        setName(value);
        return;

      case 'number':
        setNumber(value);
        return;

      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    const finderContact = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (finderContact) {
      return alert(`Contact with this ${name} already exists`);
    }

    dispatch(addContact({ id: shortid.generate(), name, number }));

    setName('');
    setNumber('');
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            className={s.inputForm}
            onChange={handleInputChange}
            value={name}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label>
          Number
          <input
            className={s.inputForm}
            onChange={handleInputChange}
            value={number}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <button
          className={s.buttonSubmit}
          type="submit"
          disabled={!name || !number}
        >
          Add contact
        </button>
      </form>
    </>
  );
}
