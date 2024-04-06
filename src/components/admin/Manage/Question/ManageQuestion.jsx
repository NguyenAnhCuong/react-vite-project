import { useState } from "react";
import Select from "react-select";
import "./ManageQuestion.scss";
import { v4 as uuidv4 } from "uuid";
import { TbHeartPlus } from "react-icons/tb";
import { BsFillPatchPlusFill, BsFillPatchMinusFill } from "react-icons/bs";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { RiImage2Fill } from "react-icons/ri";
import _ from "lodash";

const ManageQuestion = (props) => {
  const options = [
    { value: "EASY", label: "EASY" },
    { value: "MEDIUM", label: "MEDIUM" },
    { value: "HARD", label: "HARD" },
  ];
  const [selectedQuiz, setSelectedQuiz] = useState({});

  const [questions, setQuestions] = useState([
    {
      id: uuidv4(),
      description: "",
      imageFile: "",
      imageName: "",
      answers: [
        {
          id: uuidv4(),
          description: "",
          isCorrect: false,
        },
      ],
    },
  ]);

  const AddRemoveQuestion = (type, id) => {
    if (type === "ADD") {
      const newQuestion = {
        id: uuidv4(),
        description: "",
        imageFile: "",
        imageName: "",
        answers: [
          {
            id: uuidv4(),
            description: "",
            isCorrect: false,
          },
        ],
      };
      setQuestions([...questions, newQuestion]);
    }
    if (type === "REMOVE") {
      let questionsClone = _.cloneDeep(questions);
      questionsClone = questionsClone.filter((item) => item.id !== id);
      setQuestions(questionsClone);
    }
  };

  const AddRemoveAnswer = (type, qId, aId) => {
    let questionsClone = _.cloneDeep(questions);
    if (type === "ADD") {
      const newAnswer = {
        id: uuidv4(),
        description: "",
        isCorrect: false,
      };

      let questionIndex = questionsClone.findIndex((item) => item.id === qId);
      questionsClone[questionIndex].answers.push(newAnswer);

      setQuestions(questionsClone);
    }
    if (type === "REMOVE") {
      let questionIndex = questionsClone.findIndex((item) => item.id === qId);
      questionsClone[questionIndex].answers = questionsClone[
        questionIndex
      ].answers.filter((item) => item.id !== aId);

      setQuestions(questionsClone);
    }
  };

  const handleOnChange = (type, qId, aId, value) => {
    let questionsClone = _.cloneDeep(questions);
    let questionIndex = questionsClone.findIndex((item) => item.id === qId);
    if (type === "QUESTION") {
      if (questionIndex > -1) {
        questionsClone[questionIndex].description = value;
        setQuestions(questionsClone);
      }
    }
    if (type === "ANSWER" || type === "CHECKBOX") {
      if (questionIndex > -1) {
        questionsClone[questionIndex].answers = questionsClone[
          questionIndex
        ].answers.map((answer) => {
          if (answer.id === aId) {
            if (type === "CHECKBOX") {
              answer.isCorrect = value;
            }
            if (type === "ANSWER") {
              answer.description = value;
            }
          }
          return answer;
        });
        setQuestions(questionsClone);
      }
    }
  };

  const handleChangeImageFile = (qId, event) => {
    let questionsClone = _.cloneDeep(questions);
    let questionIndex = questionsClone.findIndex((item) => item.id === qId);
    if (
      questionIndex > -1 &&
      event.target &&
      event.target.files &&
      event.target.files[0]
    ) {
      questionsClone[questionIndex].imageFile = event.target.files[0];
      questionsClone[questionIndex].imageName = event.target.files[0].name;
      setQuestions(questionsClone);
    }
  };

  const handleSubmitQuestion = () => {};

  return (
    <div className="question-container">
      <div className="title">Manage Question</div>
      <br />
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
        {questions &&
          questions.length > 0 &&
          questions.map((question, index) => {
            return (
              <div key={question.id} className="q-main mb-4">
                <div className="question-content">
                  <div className="form-floating description">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="name@example.com"
                      value={question.description}
                      onChange={(e) =>
                        handleOnChange(
                          "QUESTION",
                          question.id,
                          "",
                          e.target.value
                        )
                      }
                    />
                    <label>Question {index + 1}'s Description</label>
                  </div>
                  <div className="group-upload">
                    <label htmlFor="imageQ">
                      <RiImage2Fill className="label-upload" />
                    </label>
                    <input
                      type="file"
                      hidden
                      id="imageQ"
                      onChange={(e) => handleChangeImageFile(question.id, e)}
                    />
                    <span>
                      {question.imageName
                        ? question.imageName
                        : "0 file is uploaded"}
                    </span>
                  </div>
                  <div className="btn-add">
                    <span onClick={() => AddRemoveQuestion("ADD", "")}>
                      <BsFillPatchPlusFill className="icon-add" />
                    </span>
                    {questions.length > 1 && (
                      <span
                        onClick={() => AddRemoveQuestion("REMOVE", question.id)}
                      >
                        <BsFillPatchMinusFill className="icon-remove" />
                      </span>
                    )}
                  </div>
                </div>
                {question.answers &&
                  question.answers.length > 0 &&
                  question.answers.map((answer, index) => {
                    return (
                      <div key={answer.id} className="answer-content">
                        <input
                          className="form-check-input checkbox"
                          type="checkbox"
                          checked={answer.isCorrect}
                          onChange={(e) =>
                            handleOnChange(
                              "CHECKBOX",
                              question.id,
                              answer.id,
                              e.target.checked
                            )
                          }
                        />
                        <div className="form-floating a-description">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="name@example.com"
                            value={answer.description}
                            onChange={(e) =>
                              handleOnChange(
                                "ANSWER",
                                question.id,
                                answer.id,
                                e.target.value
                              )
                            }
                          />
                          <label>Answer {index + 1}</label>
                        </div>
                        <div className="btn-add">
                          <span
                            onClick={() =>
                              AddRemoveAnswer("ADD", question.id, "")
                            }
                          >
                            <AiOutlinePlusCircle className="icon-add" />
                          </span>
                          {question.answers.length > 1 && (
                            <span
                              onClick={() =>
                                AddRemoveAnswer(
                                  "REMOVE",
                                  question.id,
                                  answer.id
                                )
                              }
                            >
                              <AiOutlineMinusCircle className="icon-remove" />
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            );
          })}
        {questions && questions.length > 0 && (
          <div className="mx-3">
            <button
              className="btn btn-warning"
              onClick={() => handleSubmitQuestion()}
            >
              Save Question
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default ManageQuestion;
