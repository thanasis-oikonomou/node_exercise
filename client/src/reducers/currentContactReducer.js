import { createSlice } from '@reduxjs/toolkit';

const currentContactSlice = createSlice({
  name: 'currentContact',
  initialState: null,
  reducers: {
    setCurrentContact(state, action) {
      return action.payload;
    },
    clearCurrentContact(state) {
      return null;
    },
  },
});

export const { setCurrentContact, clearCurrentContact } = currentContactSlice.actions;
export default currentContactSlice.reducer;
