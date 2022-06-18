import ContactForm from './Form/ContactForm ';
import ContactList from './Contacts/ContactList ';
import Filter from './Filter/Filter';

export default function App() {
  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm />
      <Filter />

      <h2>Contacts</h2>
      <ContactList />
    </div>
  );
}
