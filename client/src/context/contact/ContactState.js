import React, { useReducer } from 'react';
import {v4} from 'uuid';
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  UPDATE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  FILLTER_CONTACTS,
  CLEAR_FILTER,
} from '../types';

const ContactState = (props) => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: 'Jill Johnson',
        email: 'jill@mail.com',
        phone: '222-111-222',
        type: 'personal',
      },
      {
        id: 2,
        name: 'Sara williams',
        email: 'sara@mail.com',
        phone: '888-444-222',
        type: 'professional',
      },
      {
        id: 3,
        name: 'John Doe',
        email: 'doe@mail.com',
        phone: '222-090-221',
        type: 'personal',
      },
    ],
  };
  const [state, dispatch] = useReducer(ContactReducer, initialState);

  //Add contact
  const addContact = (contact) => {
    contact.id = v4();
    dispatch({type: ADD_CONTACT, payload: contact})
  }
  //Delete Contact

  //Set current contact

  //Clear Current contact

  //Update Contacts

  //Filter Contacts

  //Clear Contacts

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        addContact
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
