import { useLocation, useParams } from "react-router";
import "./DetailQuiz.scss";
import { useEffect, useState } from "react";
import { getDataQuiz } from "../utils/api/ApiServices";
import _ from "lodash";
import Questions from "./Questions";

const DetailQuiz = (props) => {
  const params = useParams();
  const quizId = params.id;
  const location = useLocation();
  const [listQuiz, setListQuiz] = useState([]);
  const [currQuiz, setCurrQuiz] = useState(0);

  useEffect(() => {
    fetchQuestion();
  }, [quizId]);

  const fetchQuestion = async () => {
    let res = await getDataQuiz(quizId);
    if (res && res.EC === 0) {
      let raw = res.DT;
      let data = _.chain(raw)
        .groupBy("id")
        .map((value, key) => {
          let answers = [];
          let questionDecription,
            image = null;
          value.forEach((item, index) => {
            if (index === 0) {
              questionDecription = item.description;
              image = item.image;
            }
            item.answers.isTheSelected = false;
            answers.push(item.answers);
          });
          return { questionId: key, answers, questionDecription, image };
        })
        .value();
      setListQuiz(data);
    }
  };

  const handlePrev = () => {
    if (currQuiz - 1 < 0) return;
    setCurrQuiz(currQuiz - 1);
  };
  const handleNext = () => {
    if (listQuiz && listQuiz.length > currQuiz + 1) setCurrQuiz(currQuiz + 1);
  };
  const handleFinish = () => {};

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
    <div className="detail-quiz-container">
      <div className="left-content">
        <div className="title">
          Quiz {quizId}: {location?.state?.quizTitle}
        </div>
        <hr />
        <div className="quiz-body">
          <img />
        </div>
        <div className="quiz-content">
          <Questions
            handleCheckBox={handleCheckBox}
            currQuiz={currQuiz}
            listQuiz={listQuiz && listQuiz.length > 0 ? listQuiz[currQuiz] : []}
          />
        </div>
        <div className="footer">
          <button className="btn btn-primary" onClick={() => handlePrev()}>
            Prev
          </button>
          <button className="btn btn-secondary" onClick={() => handleNext()}>
            Next
          </button>
          <button className="btn btn-warning" onClick={() => handleFinish()}>
            Finish
          </button>
        </div>
      </div>
      <div className="right-content">Count down</div>
    </div>
  );
};
export default DetailQuiz;
