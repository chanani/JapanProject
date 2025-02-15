import {configureStore} from "@reduxjs/toolkit";
import dialogSlice from "../store/modules/dialogSlice.js";

// store 연결해줘야됨
export default configureStore({
  reducer: {
    dialogSlice: dialogSlice.reducer,
  },
});
