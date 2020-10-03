import React, { useReducer } from 'react';
import { v4 } from 'uuid';
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
    current: null,
    filtered: null
  };
  const [state, dispatch] = useReducer(ContactReducer, initialState);

  //Add contact
  const addContact = (contact) => {
    contact.id = v4();
    dispatch({ type: ADD_CONTACT, payload: contact });
  };
  //Delete Contact
  const deleteContact = (id) => {
    dispatch({ type: DELETE_CONTACT, payload: id });
  };
  //Set current contact
  const setCurrent = (current) => {
    dispatch({ type: SET_CURRENT, payload: current });
  };
  //Clear Current contact
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };
  //Update Contacts
  const updateContact = (contact) =>
    dispatch({ type: UPDATE_CONTACT, payload: contact });
  //Filter Contacts
  const filterContacts = text =>
    dispatch({ type: FILLTER_CONTACTS, payload: text });

  //Clear Contacts
  const clearFilter = () =>
  dispatch({ type: CLEAR_FILTER });

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
