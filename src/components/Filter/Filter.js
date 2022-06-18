import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFilter, getContacts } from 'redux/contacts/contacts-selectors';
import { setFilter } from 'redux/contacts/contactsSlice';

import s from './Filter.module.css';

export default function Filter() {
  const filter = useSelector(getFilter);
  const contacts = useSelector(getContacts);

  const dispatch = useDispatch();

  const handleChange = e => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <>
      {contacts.length > 1 && (
        <div>
          <label>
            Find contacts by names
            <input
              type="text"
              value={filter}
              onChange={handleChange}
              className={s.inputForm}
            />
          </label>
        </div>
      )}
    </>
  );
}
