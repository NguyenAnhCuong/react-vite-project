import { useState } from "react";
import "./ListQuiz.scss";
import { useEffect } from "react";
import { getQuizByUser } from "../utils/api/ApiServices";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import quizImg from "../../assets/quiz.jpg";

const ListQuiz = () => {
  const navigate = useNavigate();
  const [arrQuiz, setArrQuiz] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    getQuizData();
  }, []);

  const getQuizData = async () => {
    // let res = await getQuizByUser();
    // if (res && res.EC === 0) {
    //   setArrQuiz(res.DT);
    // }
    let init = {
      EC: 0,
      DT: [
        {
          id: 1,
          description: "Quiz number 1",
          image: quizImg,
        },
        {
          id: 2,
          description: "Quiz number 2",
          image: quizImg,
        },
        {
          id: 3,
          description: "Quiz number 3",
          image: quizImg,
        },
        {
          id: 4,
          description: "Quiz number 4",
          image: quizImg,
        },
      ],
    };

    setArrQuiz(init.DT);
  };

  return (
    <div className="list-quiz-container container">
      {arrQuiz &&
        arrQuiz.length > 0 &&
        arrQuiz.map((quiz, index) => {
          return (
            <div key={`${quiz.id}`} className="card" style={{ width: "18rem" }}>
              <img
                className="card-img-top"
                src={`${quiz.image}`}
                alt="Card image cap"
              />
              <div className="card-body">
                <h5 className="card-title">
                  {t("listquiz.quizTitle")} {index + 1}
                </h5>
                <p className="card-text">{quiz.description}</p>
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    navigate(`/quiz/${quiz.id}`, {
                      state: { quizTitle: quiz.description },
                    })
                  }
                >
                  {t("listquiz.button")}
                </button>
              </div>
            </div>
          );
        })}
      {arrQuiz && arrQuiz.length === 0 && <div>{t("listquiz.noQuiz")}...</div>}
    </div>
  );
};
export default ListQuiz;
