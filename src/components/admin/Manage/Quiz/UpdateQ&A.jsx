import { useEffect, useState } from "react";
import Select from "react-select";
import "./UpdateQ&A.scss";
import { v4 as uuidv4 } from "uuid";
import { TbHeartPlus } from "react-icons/tb";
import { BsFillPatchPlusFill, BsFillPatchMinusFill } from "react-icons/bs";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { RiImage2Fill } from "react-icons/ri";
import _, { values } from "lodash";
import Lightbox from "react-18-image-lightbox";
import {
  getAllQuizforAdmin,
  postCreateNewAnswerForQuestion,
  postCreateNewQuestionForQuiz,
} from "../../../utils/api/ApiServices";
import { toast } from "react-toastify";
import ModalPreviewImage2 from "./ModalPreviewImage";

const UpdateQA = (props) => {
  const initQuestion = [
    {
      id: uuidv4(),
      description: "",
      imageFile: "",
      imageName: "",
      isTheValidQuestion: "",
      answers: [
        {
          id: uuidv4(),
          description: "",
          isCorrect: false,
          isTheValidAnswer: "",
        },
      ],
    },
  ];
  const [questions, setQuestions] = useState(initQuestion);
  const [previewImage, setPreviewImage] = useState(false);
  const [dataImage, setDataImage] = useState({
    title: "",
    url: "",
  });
  const [listQuiz, setListQuiz] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState({});

  useEffect(() => {
    fetchListQuiz();
  }, []);

  const fetchListQuiz = async () => {
    let res = await getAllQuizforAdmin();
    if (res && res.EC === 0) {
      let newQuiz = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.description}`,
        };
      });
      setListQuiz(newQuiz);
    }
  };

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

  const handleSubmitQuestion = async () => {
    const questionsClone = _.cloneDeep(questions);
    //validate
    if (_.isEmpty(selectedQuiz)) {
      toast.error("Please Choose a Quiz");
      return;
    }
    //validate answer
    let isValidAnswer = true;
    let indexQuestion = 0,
      indexAnswer = 0;
    for (let i = 0; i < questionsClone.length; i++) {
      for (let j = 0; j < questionsClone[i].answers.length; j++) {
        if (!questionsClone[i].answers[j].description) {
          isValidAnswer = false;
          questionsClone[i].answers[j].isTheValidAnswer = false;
          indexAnswer = j;
          break;
        } else {
          questionsClone[i].answers[j].isTheValidAnswer = "";
        }
      }
      indexQuestion = i;
      if (isValidAnswer === false) {
        break;
      }
    }
    if (isValidAnswer === false) {
      toast.error(
        `Not empty Answer ${indexAnswer + 1} at Question ${indexQuestion + 1}`
      );
      setQuestions(questionsClone);
      return;
    }
    //validate question
    let isValidQuestion = true;
    let indexQuestion1 = 0;
    for (let i = 0; i < questionsClone.length; i++) {
      if (!questionsClone[i].description) {
        isValidQuestion = false;
        questionsClone[i].isTheValidQuestion = false;
        indexQuestion1 = i;
        break;
      } else {
        questionsClone[i].isTheValidQuestion = "";
      }
    }
    if (isValidQuestion === false) {
      toast.error(`Not empty description for Question ${indexQuestion1 + 1}`);
      setQuestions(questionsClone);
      return;
    }

    //submit question
    for (const question of questions) {
      const q = await postCreateNewQuestionForQuiz(
        +selectedQuiz.value,
        question.description,
        question.imageFile
      );
      //submit answer
      for (const item of question.answers) {
        question.answers.map(async (item) => {
          await postCreateNewAnswerForQuestion(
            item.description,
            item.isCorrect,
            q.DT.id
          );
        });
      }
    }
    toast.success("Create questions and answers succed!!!");
    setQuestions(initQuestion);
  };

  const handlePreviewImage = (qId) => {
    let questionsClone = _.cloneDeep(questions);
    let questionIndex = questionsClone.findIndex((item) => item.id === qId);
    if (questionIndex > -1) {
      setDataImage({
        url: URL.createObjectURL(questionsClone[questionIndex].imageFile),
        title: questionsClone[questionIndex].imageName,
      });
      setPreviewImage(true);
    }
  };

  return (
    <div className="question-container">
      <div className="title">Manage Question</div>
      <br />
      <div className="add-new-question">
        <div className="col-6 form-group">
          <label>Select Quiz:</label>
          <Select
            value={selectedQuiz}
            options={listQuiz}
            onChange={setSelectedQuiz}
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
                      className={`form-control ${
                        question.isTheValidQuestion === false
                          ? "is-invalid"
                          : ""
                      }`}
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
                    <label htmlFor={`${question.id}`}>
                      <RiImage2Fill className="label-upload" />
                    </label>
                    <input
                      type="file"
                      hidden
                      id={`${question.id}`}
                      onChange={(e) => handleChangeImageFile(question.id, e)}
                    />
                    <span>
                      {question.imageName ? (
                        <span onClick={() => handlePreviewImage(question.id)}>
                          {question.imageName}
                        </span>
                      ) : (
                        "0 file is uploaded"
                      )}
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
                            className={`form-control ${
                              answer.isTheValidAnswer === false
                                ? "is-invalid"
                                : ""
                            }`}
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
        {/* {previewImage === true && (
          <Lightbox
            imageTitle={dataImage.title}
            mainSrc={dataImage.url}
            onCloseRequest={() => setPreviewImage(false)}
          />
        )} */}
        <ModalPreviewImage2
          show={previewImage}
          setShow={setPreviewImage}
          dataImage={dataImage}
        />
      </div>
    </div>
  );
};
export default UpdateQA;
