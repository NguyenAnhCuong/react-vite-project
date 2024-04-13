import { useEffect, useState } from "react";
import { getHistory } from "../../utils/api/ApiServices";
import moment from "moment";
import { useTranslation } from "react-i18next";

const History = (props) => {
  const { t } = useTranslation();
  const [listHistory, setListHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    let res = await getHistory();
    if (res && res.EC === 0) {
      let newData = res?.DT?.data?.map((item) => {
        return {
          total_correct: item.total_correct,
          total_questions: item.total_questions,
          name: item?.quizHistory?.name ?? "",
          id: item.id,
          date: moment(item.createAt).utc().format("DD/MM/YYYY hh:mm:ss A"),
        };
      });
      if (newData.length > 7) {
        newData = newData.slice(newData.length - 7, newData.length);
      }
      setListHistory(newData);
      console.log(listHistory);
    }
  };

  return (
    <>
      <table className="table table-hover table-bordered mx-3 my-3">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">{t("modal.profile.tabs.history.name")}</th>
            <th scope="col">{t("modal.profile.tabs.history.totalQuestion")}</th>
            <th scope="col">{t("modal.profile.tabs.history.totalCorrect")}</th>
            <th scope="col">{t("modal.profile.tabs.history.date")}</th>
          </tr>
        </thead>
        <tbody>
          {listHistory &&
            listHistory.length > 0 &&
            listHistory.map((quiz, index) => {
              return (
                <tr key={`table-quiz-${index}`}>
                  <td>{quiz.id}</td>
                  <td>{quiz.name}</td>
                  <td>{quiz.total_questions}</td>
                  <td>{quiz.total_correct}</td>
                  <td>{quiz.date}</td>
                </tr>
              );
            })}
          {listHistory && listHistory.length === 0 && (
            <tr>
              <td colSpan={"5"}>{t("modal.profile.tabs.history.noData")}</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};
export default History;
