import React, { useReducer } from "react"
import axios from "axios"
import ContactContext from "./contactContext"
import ContactReducer from "./contactReducer"
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  UPDATE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  FILLTER_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR,
  GET_CONTACT,
  CLEAR_CONTACT,
} from "../types"

const ContactState = (props) => {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null,
  }
  const [state, dispatch] = useReducer(ContactReducer, initialState)
  //Get contact.
  const getContact = async () => {
    try {
      const res = await axios.get("/api/contacts")
      dispatch({ type: GET_CONTACT, payload: res.data })
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error.response.msg })
    }
  }

  //Add contact
  const addContact = async (contact) => {
    const config = {
      headers: { "Content-Type": "application/json" },
    }
    try {
      const res = await axios.post("/api/contacts", contact, config)
      dispatch({ type: ADD_CONTACT, payload: res.data })
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error.response.msg })
    }
  }
  //Delete Contact
  const deleteContact = async (id) => {
    try {
      await axios.delete(`/api/contacts/${id}`)
      dispatch({
        type: DELETE_CONTACT,
        payload: id,
      })
    } catch (error) {
      dispatch({
        type: CONTACT_ERROR,
        payload: error.response.msg,
      })
    }
  }

  //Update Contacts
  const updateContact = async (contact) => {
    const config = {
      headers: { "Content-Type": "application/json" },
    }
    try {
      const res = await axios.put(
        `/api/contacts/${contact._id}`,
        contact,
        config,
      )
      dispatch({
        type: UPDATE_CONTACT,
        payload: res.data,
      })
    } catch (error) {
      dispatch({
        type: CONTACT_ERROR,
        payload: error.response.msg,
      })
    }
    dispatch({ type: UPDATE_CONTACT, payload: contact })
  }
  //Set current contact
  const setCurrent = (current) => {
    dispatch({ type: SET_CURRENT, payload: current })
  }
  //Clear Current contact
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT })
  }
  //Clear Contacts.
  const clearContacts = () => {
    dispatch({ type: CLEAR_CONTACT })
  }

  //Filter Contacts
  const filterContacts = (text) =>
    dispatch({ type: FILLTER_CONTACTS, payload: text })

  //Clear Contacts
  const clearFilter = () => dispatch({ type: CLEAR_FILTER })

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter,
        getContact,
        clearContacts,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  )
}

export default ContactState
