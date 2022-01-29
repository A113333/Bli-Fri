import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

export default function MyModal(props) {
  console.log("mymodal");

  return (
    <div>
      <Dialog
        {...props}
        open={props.open}
        keepMounted
        onClose={props.onClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {props.text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose}>Okej</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
