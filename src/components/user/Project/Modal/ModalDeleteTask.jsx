import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  IconButton,
  TextareaAutosize,
} from "@mui/material";
import { useEffect, useState } from "react";
import { deleteTask } from "../../../utils/api/taskServices";
import { toast } from "react-toastify";
import _ from "lodash";

const ModalDeleteTask = (props) => {
  const { open, setOpen, projectId, dataDeleteTask } = props;

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmitTask = async () => {
    let res = await deleteTask(dataDeleteTask.id);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      handleClose();
      props.fetchListTask();
    } else {
      toast.error(res.errors);
      return;
    }
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} scroll="body">
        <DialogContent>Delete this Task: {dataDeleteTask.name}?</DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleSubmitTask} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ModalDeleteTask;
