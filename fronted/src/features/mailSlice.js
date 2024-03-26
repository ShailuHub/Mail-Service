import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  inboxMails: [],
  selectedMails: [],
  sentMails: [],
};

const mailSlice = createSlice({
  name: "Mail",
  initialState,
  reducers: {
    setInboxMails: (state, action) => {
      state.inboxMails = action.payload;
    },
    setSelectedMails: (state, action) => {
      state.selectedMails = [...state.selectedMails, action.payload];
    },
    setDeselectedMails: (state, action) => {
      state.selectedMails = state.selectedMails.filter(
        (mail) => mail.mailId != action.payload
      );
    },
    setSentMails: (state, action) => {
      state.sentMails = action.payload;
    },
  },
});

export default mailSlice;
