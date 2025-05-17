import { useLocation, useParams } from "react-router";
import "./DetailQuiz.scss";
import { useEffect, useState } from "react";
import { getDataQuiz, postSubmitQuiz } from "../utils/api/ApiServices";
import _ from "lodash";
import PerfectScrollbar from "react-perfect-scrollbar";
import Questions from "./Questions";
import { toast } from "react-toastify";
import ModalResult from "./ModalResult";
import RightContent from "./RigthContent/RightContent";
import { useTranslation } from "react-i18next";

const DetailQuiz = () => {
  const params = useParams();
  const quizId = params.id;
  const location = useLocation();
  const [listQuiz, setListQuiz] = useState([]);
  const [currQuiz, setCurrQuiz] = useState(0);
  const { t } = useTranslation();

  const [showModalResult, setShowModalResult] = useState(false);
  const [dataModalResult, setDataModalResult] = useState({});

  useEffect(() => {
    fetchQuestion();
  }, [quizId]);

  // const fetchQuestion = async () => {
  //   let res = await getDataQuiz(quizId);
  //   if (res && res.EC === 0) {
  //     let raw = res.DT;
  //     let data = _.chain(raw)
  //       .groupBy("id")
  //       .map((value, key) => {
  //         let answers = [];
  //         let questionDecription,
  //           image = null;
  //         value.forEach((item, index) => {
  //           if (index === 0) {
  //             questionDecription = item.description;
  //             image = item.image;
  //           }
  //           item.answers.isTheSelected = false;
  //           answers.push(item.answers);
  //         });
  //         answers = _.orderBy(answers, ["id"], ["asc"]);

  //         return { questionId: key, answers, questionDecription, image };
  //       })
  //       .value();
  //     setListQuiz(data);
  //   }
  // };

  const fetchQuestion = async () => {
    let data = {
      quizId: +quizId,
    };

    setListQuiz(data);
  };

  const handlePrev = () => {
    if (currQuiz - 1 < 0) return;
    setCurrQuiz(currQuiz - 1);
  };
  const handleNext = () => {
    if (listQuiz && listQuiz.length > currQuiz + 1) setCurrQuiz(currQuiz + 1);
  };
  const handleFinish = async () => {
    const payload = {
      quizId: +quizId,
      answers: [],
    };
    let answers = [];
    if (listQuiz && listQuiz.length > 0) {
      listQuiz.forEach((item) => {
        let questionId = item.questionId;
        let userAnswerId = [];

        item.answers.forEach((answer) => {
          if (answer.isTheSelected === true) {
            userAnswerId.push(answer.id);
          }
        });
        answers.push({
          questionId: +questionId,
          userAnswerId: userAnswerId,
        });
      });
      payload.answers = answers;
      //submit api
      let res = await postSubmitQuiz(payload);
      if (res && res.EC === 0) {
        setDataModalResult({
          countCorrect: res.DT.countCorrect,
          countTotal: res.DT.countTotal,
          quizData: res.DT.quizData,
        });
        toast.success(res.EM);
        setShowModalResult(true);
      } else {
        toast.error(res.EM);
      }
    }
  };

  const handleCheckBox = (answerId, questionId) => {
    let listQuizClone = _.cloneDeep(listQuiz);
    let question = listQuizClone.find(
      (item) => +item.questionId === +questionId
    );
    if (question && question.answers) {
      question.answers = question.answers.map((item) => {
        if (+item.id === +answerId) {
          item.isTheSelected = !item.isTheSelected;
        }
        return item;
      });
    }
    let index = listQuizClone.findIndex(
      (item) => +item.questionId === +questionId
    );
    if (index > -1) {
      listQuizClone[index] = question;
      setListQuiz(listQuizClone);
    }
  };

  return (
    <PerfectScrollbar style={{ height: "100vh" }}>
      <>
        <div className="detail-quiz-container">
          <div className="left-content">
            <div className="title">
              {t("detailQuiz.quizTitle")} {quizId}: {location?.state?.quizTitle}
            </div>
            <hr />
            <div className="quiz-body">
              <img src="" />
            </div>
            <div className="quiz-content">
              <Questions
                handleCheckBox={handleCheckBox}
                currQuiz={currQuiz}
                listQuiz={
                  listQuiz && listQuiz.length > 0 ? listQuiz[currQuiz] : []
                }
              />
            </div>
            <div className="footer">
              <button className="btn btn-primary" onClick={() => handlePrev()}>
                {t("detailQuiz.button.prev")}
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => handleNext()}
              >
                {t("detailQuiz.button.next")}
              </button>
              <button
                className="btn btn-warning"
                style={{ width: "100px" }}
                onClick={() => handleFinish()}
              >
                {t("detailQuiz.button.finish")}
              </button>
            </div>
          </div>
          <div className="right-content">
            <RightContent
              setCurrQuiz={setCurrQuiz}
              handleFinish={handleFinish}
              dataQuiz={listQuiz}
            />
          </div>
          <ModalResult
            dataModalResult={dataModalResult}
            show={showModalResult}
            setShow={setShowModalResult}
          />
        </div>
      </>
    </PerfectScrollbar>
  );
};
export default DetailQuiz;
