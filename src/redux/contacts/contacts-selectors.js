export const getContacts = state => state.contacts.contacts;

export const getFilter = state => state.contacts.filter;

export const getContactsForDisplay = state => {
  const contacts = getContacts(state);
  const filter = getFilter(state);

  const filterLowerCase = filter.toLowerCase();

  return contacts.filter(contact =>
    contact.name.toLowerCase().includes(filterLowerCase)
  );
};
