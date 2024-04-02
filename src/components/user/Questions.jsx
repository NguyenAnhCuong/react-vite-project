import _ from "lodash";

const Questions = (props) => {
  const { listQuiz, currQuiz } = props;

  if (_.isEmpty(listQuiz)) {
    return <></>;
  }

  const handleCheckBoxx = (e, aId, qId) => {
    props.handleCheckBox(aId, qId);
  };

  return (
    <>
      {listQuiz.image ? (
        <div className="quiz-image">
          <img src={`data:image/jpeg;base64,${listQuiz.image}`} />
        </div>
      ) : (
        <div className="quiz-image"></div>
      )}
      <div className="question">
        Question {currQuiz + 1}: {listQuiz.questionDecription}?
      </div>
      <div className="answers">
        {listQuiz.answers &&
          listQuiz.answers.length > 0 &&
          listQuiz.answers.map((a, index) => {
            return (
              <div key={`answer-${index + 1}`} className="answer">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={a.isTheSelected}
                    onChange={(e) =>
                      handleCheckBoxx(e, a.id, listQuiz.questionId)
                    }
                  />
                  <label className="form-check-label">{a.description}</label>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};
export default Questions;
