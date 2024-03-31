import { useLocation, useParams } from "react-router";
import "./DetailQuiz.scss";
import { useEffect } from "react";
import { getDataQuiz } from "../utils/api/ApiServices";
import _ from "lodash";

const DetailQuiz = (props) => {
  const params = useParams();
  const quizId = params.id;
  const location = useLocation();

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
            answers.push(item.answers);
          });
          return { questionId: key, answers, questionDecription, image };
        })
        .value();
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
          <div className="question">Question1</div>
          <div className="answers">
            <div className="answer">A</div>
            <div className="answer">A</div>
            <div className="answer">A</div>
          </div>
        </div>
        <div className="footer">
          <button className="btn btn-primary">Prev</button>
          <button className="btn btn-secondary">Next</button>
        </div>
      </div>
      <div className="right-content">Count down</div>
    </div>
  );
};
export default DetailQuiz;
