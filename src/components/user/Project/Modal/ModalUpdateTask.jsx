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

const ModalUpdateTask = (props) => {
  const { open, setOpen, projectId, dataUpdateTask } = props;

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
    if (!_.isEmpty(dataUpdateTask)) {
      setName(dataUpdateTask.name);
      setDescription(dataUpdateTask.description);
      setStatus(dataUpdateTask.status);
      setDeadline(dataUpdateTask.deadline);
    }
  }, [dataUpdateTask]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmitTask = async () => {
    let res = await putUpdateTask(
      dataUpdateTask.id,
      projectId,
      name,
      description,
      status,
      deadline
    );
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
        <DialogTitle>Modal Update Task</DialogTitle>
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
                />
              </div>
              <div className="form-group col-5">
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    label="status"
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
          <Button onClick={handleSubmitTask} autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ModalUpdateTask;
