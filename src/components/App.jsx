import React, { Component } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import ContactFilter from './ContactFilter';
import { Container, H1, H2 } from '../styles/AppStyles';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contacts: [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ],
      filter: '',
    };

    this.addContact = this.addContact.bind(this);
    this.deleteContact = this.deleteContact.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  addContact(contact) {
    if (
      this.state.contacts.some(
        c => c.name.toLowerCase() === contact.name.toLowerCase()
      )
    ) {
      alert(`${contact.name} is already in contacts`);
      return;
    }

    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
  }

  deleteContact(id) {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(c => c.id !== id),
    }));
  }

  handleFilterChange(e) {
    this.setState({ filter: e.target.value });
  }

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <Container>
        <H1>Phonebook</H1>
        <ContactFilter
          filter={filter}
          handleFilterChange={this.handleFilterChange}
        />
        <H2>Add new contact</H2>
        <ContactForm contacts={contacts} addContact={this.addContact} />
        <H2>Contacts</H2>
        <ContactList
          contacts={filteredContacts}
          deleteContact={this.deleteContact}
        />
      </Container>
    );
  }
}

export default App;
