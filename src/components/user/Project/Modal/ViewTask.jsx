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
import { putUpdateTask } from "../../../utils/api/taskServices";
import { toast } from "react-toastify";
import _ from "lodash";

const ViewTask = (props) => {
  const { open, setOpen, dataViewTask } = props;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [deadline, setDeadline] = useState(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0"); // Tháng tính từ 0-11 nên cần +1 và padStart để đảm bảo luôn có 2 chữ số
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  });

  useEffect(() => {
    if (!_.isEmpty(dataViewTask)) {
      setName(dataViewTask.name);
      setDescription(dataViewTask.description);
      setStatus(dataViewTask.status);
      setDeadline(dataViewTask.deadline);
    }
  }, [dataViewTask]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} scroll="body">
        <DialogTitle>View Task</DialogTitle>
        <DialogContent>
          <form>
            <div>
              <div className="form-group col-12 mt-2">
                <TextField
                  label="Name Task"
                  type="text"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled
                />
              </div>
            </div>
            <div className="d-flex gap-5 mt-4">
              <div className="form-group col-5">
                <TextField
                  label="Deadline"
                  type="date"
                  fullWidth
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  disabled
                />
              </div>
              <div className="form-group col-5">
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    label="status"
                    disabled
                  >
                    <MenuItem value="pending">PENDING</MenuItem>
                    <MenuItem value="in_progress">In progress</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="mt-4">
              <InputLabel>Description</InputLabel>
              <TextareaAutosize
                disabled
                className="form-control"
                style={{ resize: "none", height: "100px" }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ViewTask;
