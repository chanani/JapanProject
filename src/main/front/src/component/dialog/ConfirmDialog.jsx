import React, {useState} from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

import {useDispatch, useSelector} from "react-redux";
import {closeConfirmDialog} from "@/store/modules/dialogSlice";
import {Button} from "@mui/material";

export default function ConfirmDiaLog() {
  const dispatch = useDispatch();
  const {isOpenConfirm, message} = useSelector((state) => state.dialogSlice);

  const handleConfirm = () => {
    if (typeof window.confirmDialogResolve === "function") {
      window.confirmDialogResolve(true); // Promise를 true
    }
    dispatch(closeConfirmDialog());
  };

  const handleCancel = () => {
    if (typeof window.confirmDialogResolve === "function") {
      window.confirmDialogResolve(false); // Promise를 false
    }
    dispatch(closeConfirmDialog());
  };

  if (!isOpenConfirm) return null;
  return (
    // ?? confirm Dialog에서 onClose={handleCancel}를 지울까 고민중임다
    // ?? 논의 후 삭제결정해보아염
    <Dialog
      open={isOpenConfirm}
      // onClose={handleCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent style={{paddingBottom: "0px"}}>
        <DialogContentText color={"#333"} id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color={"error"}>
          취소
        </Button>
        <Button onClick={handleConfirm} color={"success"}>
          확인
        </Button>
      </DialogActions>
    </Dialog>
  );
}
