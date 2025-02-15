import {openAlertDialog, openConfirmDialog} from "../store/modules/dialogSlice.js";
import {useDispatch} from "react-redux";

export const useDialog = () => {
  const dispatch = useDispatch();

  // confirm 창 열기
  const openConfirm = (message) => {
    return new Promise((resolve) => {
      dispatch(openConfirmDialog({message}));
      window.confirmDialogResolve = resolve; // resolve 상태를 전역에 저장
    });
  };

  // alert 창 열기
  const openAlert = (message) => {
    return new Promise((resolve) => {
      dispatch(openAlertDialog({message}));
      window.alertDialogResolve = resolve;
    });
  };

  return {openConfirm, openAlert};
};
