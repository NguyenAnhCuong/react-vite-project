import Countdown from "./Countdown";

const RightContent = (props) => {
  const { dataQuiz } = props;
  const TimeUp = () => {
    props.handleFinish();
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
              <div key={`q-${index + 1}`} className="question">
                {index + 1}
              </div>
            );
          })}
      </div>
    </>
  );
};
export default RightContent;
