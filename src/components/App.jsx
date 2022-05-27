import React, { Component } from 'react';
import ContactForm from './Form/ContactForm ';
import ContactList from './TodoContact/ContactList ';
import Filter from './Filter';
import shortid from 'shortid';

export default class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addTodoContact = ({ name, number }) => {
    const { contacts } = this.state;
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
      this.setState(({ contacts }) => ({
        contacts: [contact, ...contacts],
      }));
    }
  };

  contactDelate = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };
  changeFilter = event => {
    this.setState({
      filter: event.currentTarget.value,
    });
  };
  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  componentDidMount() {
    console.log('App componentDidMount');

    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('App componentsDidUpdate');
    if (this.state.contacts !== prevState.contacts) {
      console.log('обновилось поле контакт ');

      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }
  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addTodoContact} />
        <Filter value={filter} onChange={this.changeFilter} />

        <h2>Contacts</h2>
        <ContactList
          contacts={visibleContacts}
          onDeleteContact={this.contactDelate}
        />
      </div>
    );
  }
}
