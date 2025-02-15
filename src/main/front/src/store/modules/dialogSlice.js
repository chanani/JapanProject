import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isOpenConfirm: false,
  isOpenAlert: false,
  message: "",
};

const dialogSlice = createSlice({
  name: "dialogSlice",
  initialState,
  reducers: {
    openConfirmDialog(state, {payload}) {
      state.isOpenConfirm = true;
      state.message = payload.message;
    },
    openAlertDialog(state, {payload}) {
      state.isOpenAlert = true;
      state.message = payload.message;
    },
    closeConfirmDialog(state) {
      state.isOpenConfirm = false;
      state.message = "";
    },
    closeAlertDialog(state) {
      state.isOpenAlert = false;
      state.message = "";
    },
  },
});

export const {openConfirmDialog, openAlertDialog, closeConfirmDialog, closeAlertDialog} = dialogSlice.actions;
export default dialogSlice;
