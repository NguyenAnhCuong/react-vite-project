import { useRef } from "react";
import Countdown from "./Countdown";

const RightContent = (props) => {
  const refDiv = useRef([]);

  const { dataQuiz, setCurrQuiz } = props;

  const TimeUp = () => {
    props.handleFinish();
  };

  const getClassQuestion = (question, index) => {
    if (question && question.answers.length > 0) {
      let unAnswer = question.answers.find((a) => a.isTheSelected === true);
      if (unAnswer) {
        return "question selected";
      }
    }
    return "question";
  };

  const handleClickQuestion = (question, index) => {
    setCurrQuiz(index);
    if (refDiv.current) {
      refDiv.current.forEach((item) => {
        if (item && item.className === "question clicked") {
          item.className = "question";
        }
      });
    }
    if (question && question.answers.length > 0) {
      let isAnswer = question.answers.find((a) => a.isTheSelected === true);
      if (isAnswer) {
        return;
      }
    }
    refDiv.current[index].className = "question clicked";
  };

  return (
    <>
      <div className="timer">
        <Countdown TimeUp={TimeUp} />
      </div>
      <div className="questions">
        {dataQuiz &&
          dataQuiz.length > 0 &&
          dataQuiz.map((item, index) => {
            return (
              <div
                ref={(e) => (refDiv.current[index] = e)}
                onClick={() => handleClickQuestion(item, index)}
                key={`q-${index + 1}`}
                className={getClassQuestion(item, index)}
              >
                {index + 1}
              </div>
            );
          })}
      </div>
    </>
  );
};
export default RightContent;
