import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  inboxMails: [],
  selectedMails: [],
  sentMails: [],
  totalUnreadMails: 0,
  displayMailObject: {},
  showMail: false,
};

const mailSlice = createSlice({
  name: "Mail",
  initialState,
  reducers: {
    setInboxMails: (state, action) => {
      state.inboxMails = action.payload;
      let count = 0;
      for (const mail of state.inboxMails) {
        if (mail.isRead === false) count++;
      }
      state.totalUnreadMails = count;
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
    setDisplayMail: (state, action) => {
      state.displayMailObject = action.payload;
    },
    toggleShowMail: (state) => {
      state.showMail = !state.showMail;
    },
  },
});

export default mailSlice;
