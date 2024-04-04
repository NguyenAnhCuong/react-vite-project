import { useRef, useState } from "react";
import "./ManageQuiz.scss";
import Select from "react-select";
import { addNewQuiz } from "../../../utils/api/ApiServices";
import { toast } from "react-toastify";

const options = [
  { value: "EASY", label: "EASY" },
  { value: "MEDIUM", label: "MEDIUM" },
  { value: "HARD", label: "HARD" },
];

const ManageQuiz = () => {
  const inputRef = useRef(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("EASY");
  const [image, setImage] = useState(null);

  const handleChangeFile = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleCreateNewQuiz = async () => {
    //validate
    if (!name || !description) {
      toast.error("Name/Description is required");
      return;
    }

    let res = await addNewQuiz(description, name, type?.value, image);
    if (res && res.EC === 0) {
      let i = (inputRef.current.value = null);
      toast.success(res.EM);
      setName("");
      setDescription("");
      setImage(i);
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <div className="quiz-container">
      <div className="title">Manage Quizzes</div>
      <hr />
      <div className="add-new">
        <fieldset className="border rounded-3 p-3">
          <legend className="float-none w-auto px-3">Add New Quiz</legend>
          <div className="form-floating mb-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Quiz Name"
            />
            <label>Quiz Name</label>
          </div>
          <div className="form-floating">
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Description"
            />
            <label>Description</label>
          </div>
          <div className="select-difficult my-3">
            <Select
              defaultValue={type}
              onChange={setType}
              options={options}
              placeholder={"Quiz difficult..."}
            />
          </div>
          <div className="more-actions form-group">
            <label className="mb-1">Upload Image</label>
            <input
              ref={inputRef}
              onChange={(e) => handleChangeFile(e)}
              type="file"
              className="form-control"
            />
          </div>
          <div className="mt-3">
            <button
              className="btn btn-warning"
              onClick={() => handleCreateNewQuiz()}
            >
              Create New
            </button>
          </div>
        </fieldset>
      </div>
      <div className="list-detail">table</div>
    </div>
  );
};
export default ManageQuiz;
