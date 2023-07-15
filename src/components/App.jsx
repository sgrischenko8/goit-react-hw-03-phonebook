import { PureComponent } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { nanoid } from 'nanoid';

class App extends PureComponent {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contactsFromLocalStorage = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contactsFromLocalStorage);
    if (parsedContacts.length > 0) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      JSON.stringify(prevState.contacts) !== JSON.stringify(this.state.contacts)
    ) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  formSubmitHandler = data => {
    data.id = nanoid();

    this.setState(prevState => {
      return prevState.contacts.some(
        contact => contact.name.toLowerCase() === data.name.toLowerCase()
      )
        ? alert(`${data.name} is already in contacts.`)
        : { contacts: [...prevState.contacts, data] };
    });
  };

  deleteContact = id => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== id),
      };
    });
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  showContactByName = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <h1>Phonebook</h1>
        <ContactForm onSubmitHandle={this.formSubmitHandler} />

        <h2>Contacts</h2>
        <Filter value={this.state.filter} onChange={this.changeFilter} />

        <ContactList
          contacts={this.showContactByName()}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;
