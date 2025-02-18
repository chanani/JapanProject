// AlertDialog.js
import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import {useDispatch, useSelector} from "react-redux";
import {closeAlertDialog} from "../../store/modules/dialogSlice";

export default function AlertDialog() {
  const dispatch = useDispatch();
  const {isOpenAlert, message} = useSelector((state) => state.dialogSlice);

  const handleConfirm = () => {
    if (typeof window.alertDialogResolve === "function") {
      window.alertDialogResolve(true); // Promise를 true로 해결
    }
    dispatch(closeAlertDialog());
  };

  if (!isOpenAlert) return null;

  return (
    <Dialog open={isOpenAlert} aria-labelledby="alert-dialog-title">
      <DialogTitle style={{paddingBottom: "0px"}} id="alert-dialog-title">
        {message}
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleConfirm} color={"success"}>
          확인
        </Button>
      </DialogActions>
    </Dialog>
  );
}
