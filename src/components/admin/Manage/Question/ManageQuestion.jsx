import { useState } from "react";
import Select from "react-select";
import "./ManageQuestion.scss";
import { TbHeartPlus } from "react-icons/tb";
import { BsFillPatchPlusFill, BsFillPatchMinusFill } from "react-icons/bs";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";

const ManageQuestion = (props) => {
  const options = [
    { value: "EASY", label: "EASY" },
    { value: "MEDIUM", label: "MEDIUM" },
    { value: "HARD", label: "HARD" },
  ];
  const [selectedQuiz, setSelectedQuiz] = useState({});

  return (
    <div className="question-container">
      <div className="title">Manage Question</div>
      <div className="add-new-question">
        <div className="col-6 form-group">
          <label>Select Quiz:</label>
          <Select
            defaultValue={selectedQuiz}
            options={options}
            onChange={setSelectedQuiz}
            placeholder={"Choose a Quiz..."}
          />
        </div>
        <div className="mt-3">
          <span>Add Questions:</span>
        </div>
        <div>
          <div className="question-content">
            <div className="form-floating description">
              <input
                type="text"
                className="form-control"
                placeholder="name@example.com"
              />
              <label>Description</label>
            </div>
            <div className="group-upload">
              <label className="label-upload">Upload Image</label>
              <input type="file" hidden />
              <span>0 file is uploaded</span>
            </div>
            <div className="btn-add">
              <span>
                <BsFillPatchPlusFill className="icon-add" />
              </span>
              <span>
                <BsFillPatchMinusFill className="icon-remove" />
              </span>
            </div>
          </div>
          <div className="answer-content">
            <input className="form-check-input checkbox" type="checkbox" />
            <div className="form-floating a-description">
              <input
                type="text"
                className="form-control"
                placeholder="name@example.com"
              />
              <label>Answer 1</label>
            </div>
            <div className="btn-add">
              <span>
                <AiOutlinePlusCircle className="icon-add" />
              </span>
              <span>
                <AiOutlineMinusCircle className="icon-remove" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ManageQuestion;
