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
  getQuizWithQA,
  postCreateNewAnswerForQuestion,
  postCreateNewQuestionForQuiz,
  postUpsertQA,
} from "../../../utils/api/ApiServices";
import { toast } from "react-toastify";
import ModalPreviewImage2 from "./ModalPreviewImage";
import { useTranslation } from "react-i18next";

const UpdateQA = (props) => {
  const { t } = useTranslation();
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

  useEffect(() => {
    if (selectedQuiz && selectedQuiz.value) {
      fetchQuizWithQA();
    }
  }, [selectedQuiz]);

  function urltoFile(url, filename, mimeType) {
    if (url.startsWith("data:")) {
      var arr = url.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[arr.length - 1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      var file = new File([u8arr], filename, { type: mime || mimeType });
      return Promise.resolve(file);
    }
    return fetch(url)
      .then((res) => res.arrayBuffer())
      .then((buf) => new File([buf], filename, { type: mimeType }));
  }

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

  const fetchQuizWithQA = async () => {
    let res = await getQuizWithQA(selectedQuiz.value);
    if (res && res.EC === 0) {
      let newQA = [];
      for (let i = 0; i < res.DT.qa.length; i++) {
        let q = res.DT.qa[i];
        if (q.imageFile) {
          q.imageName = `Question-${q.id}.jpg`;
          q.imageFile = await urltoFile(
            `data:image/jpg;base64,${q.imageFile}`,
            `Question-${q.id}.jpg`,
            `image/jpg`
          );
        }
        newQA.push(q);
      }
      setQuestions(newQA);
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
    let questionsClone2 = _.cloneDeep(questions);
    for (let i = 0; i < questionsClone2.length; i++) {
      if (questionsClone2[i].imageFile) {
        questionsClone2[i].imageFile = await toBase64(
          questionsClone2[i].imageFile
        );
      }
    }
    let res = await postUpsertQA({
      quizId: selectedQuiz.value,
      questions: questionsClone2,
    });
    if (res && res.EC === 0) {
      toast.success(res.EM);
      fetchQuizWithQA();
    } else {
      toast.error(res.EM);
      return;
    }
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

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
      <div className="title">{t("admin.managequiz.updateQuiz.title")}</div>
      <br />
      <div className="add-new-question">
        <div className="col-6 form-group">
          <label>{t("admin.managequiz.updateQuiz.select")}:</label>
          <Select
            value={selectedQuiz}
            options={listQuiz}
            onChange={setSelectedQuiz}
          />
        </div>
        <div className="mt-3">
          <span>{t("admin.managequiz.updateQuiz.question.label")}:</span>
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
                    <label style={{ zIndex: "0" }}>
                      {t("admin.managequiz.updateQuiz.question.text1")}{" "}
                      {index + 1}
                      {t("admin.managequiz.updateQuiz.question.text2")}
                    </label>
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
                          <label style={{ zIndex: "0" }}>
                            {t(
                              "admin.managequiz.updateQuiz.question.answers.label"
                            )}{" "}
                            {index + 1}
                          </label>
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
              {t("admin.managequiz.updateQuiz.question.btn")}
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
