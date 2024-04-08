import Select from "react-select";
import {
  getAllQuizforAdmin,
  getAllUser,
  postAssignQuizToUser,
} from "../../../utils/api/ApiServices";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AssignQuiz = () => {
  const [listQuiz, setListQuiz] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState({});

  const [listUser, setListUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});

  useEffect(() => {
    fetchListQuiz();
    fetchUser();
  }, []);

  const fetchListQuiz = async () => {
    let res = await getAllQuizforAdmin();
    if (res && res.EC === 0) {
      let newQuiz = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.name}`,
        };
      });
      setListQuiz(newQuiz);
    }
  };

  const fetchUser = async () => {
    let res = await getAllUser();
    if (res && res.EC === 0) {
      let newUser = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.username} -${item.email}`,
        };
      });
      setListUser(newUser);
    }
  };

  const handleAssignQuiz = async () => {
    let res = await postAssignQuizToUser(
      selectedQuiz.value,
      selectedUser.value
    );
    if (res && res.EC === 0) {
      toast.success(res.EM);
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <div className="assign-quiz-container row">
      <div className="col-6 form-group">
        <label className="mb-3">Select Quiz:</label>
        <Select
          defaultValue={selectedQuiz}
          onChange={setSelectedQuiz}
          options={listQuiz}
        />
      </div>
      <div className="col-6 form-group">
        <label className="mb-3">Select User:</label>
        <Select
          defaultValue={selectedUser}
          onChange={setSelectedUser}
          options={listUser}
        />
      </div>
      <div>
        <button
          className="btn btn-success mt-3"
          onClick={() => handleAssignQuiz()}
        >
          Assign
        </button>
      </div>
    </div>
  );
};
export default AssignQuiz;
