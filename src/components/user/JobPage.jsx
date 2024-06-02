import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./JobPage.scss";
import { FaPhoneVolume } from "react-icons/fa6";
import { CiLocationOn } from "react-icons/ci";
import { getCompanyById } from "../utils/api/ApiServices";

const JobPage = (props) => {
  const params = useParams();
  const companyId = params.id;
  const [company, setCompany] = useState([]);
  const [listJob, SetListJob] = useState([]);

  useEffect(() => {
    fetchListJob();
  }, [companyId]);

  const fetchListJob = async () => {
    const res = await getCompanyById(companyId);
    if (res && res.data && res.data.ec === 0) {
      setCompany(res.data.dt);
      SetListJob(res.data.dt.jobs);
    } else {
      return;
    }
  };

  return (
    <>
      <div className="c-info container">
        <div className="logo">
          <div style={{ maxWidth: "100% !important" }}>
            <img
              src={company.logo}
              style={{ width: "100px", cursor: "pointer" }}
            />
          </div>
        </div>
        <div className="detail">
          <div>
            <span className="c-name">{company.companyName}</span>
          </div>
          <div style={{ margin: "15px 0px" }}>
            <CiLocationOn size={"1.5rem"} style={{ marginRight: "5px" }} />
            <span className="c-location">{company.location}</span>
          </div>
          <div>
            <span className="c-phone">
              Số điện thoại:{" "}
              <FaPhoneVolume size={"1.3rem"} style={{ margin: "0px 5px" }} />
              {company.companyPhone}
            </span>
          </div>
        </div>
      </div>
      <div className="c-description container">
        <div>
          <span className="title">Về chúng tôi</span>
        </div>
        <div style={{ marginTop: "10px" }}>
          <span className="content">{company.companyDescription}</span>
        </div>
      </div>
      <div className="list-job container">job</div>
    </>
  );
};
export default JobPage;
