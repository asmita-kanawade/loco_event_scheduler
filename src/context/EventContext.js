"use client"; 


import React, { createContext, useReducer, useContext } from 'react';
import { ADD_EVENT, DELETE_EVENT, EDIT_EVENT } from '../constants/eventActions';

const EventContext = createContext();

const eventReducer = (state, action) => {
  switch (action.type) {
    case ADD_EVENT:
      return [...state, action.payload];
    case DELETE_EVENT:
      return state.filter(event => event.id !== action.payload);
    case EDIT_EVENT:
      return state.map(event => event.id === action.payload.id ? action.payload : event);
    default:
      return state;
  }
};

export const EventProvider = ({ children }) => {
  const [state, dispatch] = useReducer(eventReducer, []);

  return (
    <EventContext.Provider value={{ state, dispatch }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => useContext(EventContext);

