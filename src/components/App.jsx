import React, { useState, useEffect } from 'react';
import ContactForm from './Form/ContactForm ';
import ContactList from './TodoContact/ContactList ';
import shortid from 'shortid';
import Filter from './Filter/Filter';

const initialContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

// const useLocalStorage = key => {
//   const [state, setState] = useState(() => {
//     return (
//       JSON.parse(window.localStorage.getItem('contacts')) ?? initialContacts
//     );
//   });
// };
export default function App() {
  const [contacts, setContacts] = useState(() => {
    return (
      JSON.parse(window.localStorage.getItem('contacts')) ?? initialContacts
    );
  });
  const [filter, setFilter] = useState('');

  const addTodoContact = ({ name, number }) => {
    const ReturnName = contacts.find(contact => contact.name === name);
    if (ReturnName) {
      alert(`${name} is already in the phone book `);
    } else {
      const contact = {
        id: shortid.generate(),
        name,
        number,
      };
      console.log(contact);
      setContacts([contact, ...contacts]);
    }
  };

  const contactDelate = contactId => {
    setContacts(contacts =>
      contacts.filter(contact => contact.id !== contactId)
    );
  };
  const changeFilter = event => {
    setFilter(event.currentTarget.value);
  };
  const getVisibleContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };
  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);
  // componentDidMount() {
  //   console.log('App componentDidMount');

  //   const contacts = localStorage.getItem('contacts');
  //   const parsedContacts = JSON.parse(contacts);
  //   if (parsedContacts) {
  //     this.setState({ contacts: parsedContacts });
  //   }
  // }
  // componentDidUpdate(prevProps, prevState) {
  //   console.log('App componentsDidUpdate');
  //   if (this.state.contacts !== prevState.contacts) {
  //     console.log('обновилось поле контакт ');

  //     localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  //   }
  // }

  const visibleContacts = getVisibleContacts();
  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addTodoContact} />
      <Filter value={filter} onChange={changeFilter} />

      <h2>Contacts</h2>
      <ContactList contacts={visibleContacts} onDeleteContact={contactDelate} />
    </div>
  );
}
