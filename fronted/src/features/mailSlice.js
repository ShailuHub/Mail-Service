import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allMails: [],
  selectedMails: [],
  sentMails: [],
};

const mailSlice = createSlice({
  name: "Mail",
  initialState,
  reducers: {
    setMails: (state, action) => {
      state.allMails = action.payload;
    },
    setSelectedMails: (state, action) => {
      state.selectedMails = [...state.selectedMails, action.payload];
    },
    setDeselectedMails: (state, action) => {
      state.selectedMails = state.selectedMails.filter(
        (mailId) => mailId != action.payload
      );
    },
    setSentMails: (state, action) => {
      state.sentMails = action.payload;
    },
  },
});

export default mailSlice;
