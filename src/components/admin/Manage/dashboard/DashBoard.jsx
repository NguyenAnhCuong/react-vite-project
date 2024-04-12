import { useEffect, useState } from "react";
import "./DashBoard.scss";
import {
  BarChart,
  Bar,
  Legend,
  Tooltip,
  YAxis,
  XAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { getOverview } from "../../../utils/api/ApiServices";
import { useTranslation } from "react-i18next";

const DashBoard = (props) => {
  const [dataOverview, setDataOverview] = useState([]);
  const [dataChart, setDataChart] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    fetchOverview();
  }, []);

  const fetchOverview = async () => {
    let res = await getOverview();
    if (res && res.EC === 0) {
      setDataOverview(res.DT);

      let Qz = 0,
        Qs = 0,
        As = 0;

      Qz = res?.DT?.others?.countQuiz ?? 0;
      Qs = res?.DT?.others?.countQuestions ?? 0;
      As = res?.DT?.others?.countAnswers ?? 0;

      const data = [
        {
          name: "Quizzes",
          Qz: Qz,
        },
        {
          name: "Questions",
          Qs: Qs,
        },
        {
          name: "Answers",
          As: As,
        },
      ];
      setDataChart(data);
    }
  };

  return (
    <div className="dashboaed-container">
      <div className="title">{t("admin.dashboard.title")}</div>
      <div className="content">
        <div className="c-left">
          <div className="c">
            <span className="text1">{t("admin.dashboard.user")}</span>
            <span className="text2">
              {dataOverview &&
              dataOverview.users &&
              dataOverview.users.total ? (
                <>{dataOverview.users.total}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
          <div className="c">
            <span className="text1">{t("admin.dashboard.quiz")}</span>
            <span className="text2">
              {dataOverview &&
              dataOverview.others &&
              dataOverview.others.countQuiz ? (
                <>{dataOverview.others.countQuiz}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
          <div className="c">
            <span className="text1">{t("admin.dashboard.questions")}</span>
            <span className="text2">
              {dataOverview &&
              dataOverview.others &&
              dataOverview.others.countQuestions ? (
                <>{dataOverview.others.countQuestions}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
          <div className="c">
            <span className="text1">{t("admin.dashboard.answers")}</span>
            <span className="text2">
              {dataOverview &&
              dataOverview.others &&
              dataOverview.others.countAnswers ? (
                <>{dataOverview.others.countAnswers}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
        </div>
        <div className="c-right">
          <ResponsiveContainer width={"95%"} height="100%">
            <BarChart data={dataChart}>
              {/* <CartesianGrid strokeDasharray="3 3" /> */}
              <Tooltip />
              <XAxis dataKey="name" />
              <YAxis />
              <Legend />
              <Bar dataKey="Qz" fill="#8884d8" />
              <Bar dataKey="Qs" fill="#82ca9d" />
              <Bar dataKey="As" fill="#fcb12a" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
export default DashBoard;
