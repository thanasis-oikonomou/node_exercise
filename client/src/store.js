import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import contactsReducer from './reducers/contactsReducer';
import currentContactReducer from './reducers/currentContactReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    contacts: contactsReducer,
    currentContact: currentContactReducer,
  },
});

export default store;
