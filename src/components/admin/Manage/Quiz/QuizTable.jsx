import { useEffect, useState } from "react";
import { getAllQuizforAdmin } from "../../../utils/api/ApiServices";
import { toast } from "react-toastify";
import ModalUpdateQuiz from "./ModalUpdateQuiz";
import ModalDeleteQuiz from "./ModalDeleteQuiz";
import { useTranslation } from "react-i18next";

const QuizTable = (props) => {
  const [listQuiz, setListQuiz] = useState([]);
  const { t } = useTranslation();

  const [dataUpdateQuiz, setDataUpdateQuiz] = useState({});
  const [dataDeleteQuiz, setDataDeleteQuiz] = useState({});

  const [showModalUpdateQuiz, setShowModalUpdateQuiz] = useState(false);
  const [showModalDeleteQuiz, setShowModalDeleteQuiz] = useState(false);

  useEffect(() => {
    fetchListQuiz();
  }, []);

  const fetchListQuiz = async () => {
    let res = await getAllQuizforAdmin();
    if (res && res.EC === 0) {
      setListQuiz(res.DT);
    }
  };

  const handleUpdateQuiz = (quiz) => {
    setShowModalUpdateQuiz(true);
    setDataUpdateQuiz(quiz);
  };
  const handleDeleteQuiz = (quiz) => {
    setShowModalDeleteQuiz(true);
    setDataDeleteQuiz(quiz);
  };

  const resetDataUpdateQuiz = () => {
    setDataUpdateQuiz({});
  };

  return (
    <>
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">{t("admin.managequiz.listquiz.tableQuiz.name")}</th>
            <th scope="col">
              {t("admin.managequiz.listquiz.tableQuiz.description")}
            </th>
            <th scope="col">{t("admin.managequiz.listquiz.tableQuiz.type")}</th>
            <th scope="col">
              {t("admin.managequiz.listquiz.tableQuiz.action")}
            </th>
          </tr>
        </thead>
        <tbody>
          {listQuiz &&
            listQuiz.length > 0 &&
            listQuiz.map((q, index) => {
              return (
                <tr key={`q-${index + 1}`}>
                  <td>{q.id}</td>
                  <td>{q.name}</td>
                  <td>{q.description}</td>
                  <td>{q.difficulty}</td>
                  <td>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => handleUpdateQuiz(q)}
                    >
                      {t("admin.managequiz.listquiz.tableQuiz.btn.update")}
                    </button>
                    <button
                      className="btn btn-warning mx-2"
                      onClick={() => handleDeleteQuiz(q)}
                    >
                      {t("admin.managequiz.listquiz.tableQuiz.btn.delete")}
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <ModalUpdateQuiz
        dataQuiz={dataUpdateQuiz}
        show={showModalUpdateQuiz}
        setShow={setShowModalUpdateQuiz}
        fetchListQuiz={fetchListQuiz}
        resetDataUpdateQuiz={resetDataUpdateQuiz}
      />
      <ModalDeleteQuiz
        dataDelete={dataDeleteQuiz}
        show={showModalDeleteQuiz}
        setShow={setShowModalDeleteQuiz}
        fetchListQuiz={fetchListQuiz}
      />
    </>
  );
};
export default QuizTable;
