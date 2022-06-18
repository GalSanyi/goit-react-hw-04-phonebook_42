import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getContactsForDisplay } from 'redux/contacts/contacts-selectors';
import { deleteContact } from 'redux/contacts/contactsSlice';
import s from './ContactList.module.css';

export default function ContactList() {
  const contacts = useSelector(getContactsForDisplay);
  const dispatch = useDispatch();

  const onDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  return (
    <ul>
      {contacts.map(({ id, name, number }) => (
        <li key={id}>
          <p>
            {name}: {number}
            <button onClick={() => onDeleteContact(id)} className={s.button}>
              Delete
            </button>
          </p>
        </li>
      ))}
    </ul>
  );
}
