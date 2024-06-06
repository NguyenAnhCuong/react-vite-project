import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./JobPage.scss";
import _ from "lodash";
import { FaPhoneVolume } from "react-icons/fa6";
import { CiLocationOn } from "react-icons/ci";
import { BiCoinStack } from "react-icons/bi";
import { getAllJob, getCompanyById } from "../utils/api/ApiServices";
import ModalViewJob from "./ModalViewJob";

const JobPage = (props) => {
  const params = useParams();
  const CompanyId = params.id;
  const [company, setCompany] = useState({});
  const [listJob, setListJob] = useState([]);
  const [filterJob, setFilterJob] = useState([]);
  const [showModalJob, setShowModalJob] = useState(false);
  const [jobData, setJobData] = useState({});

  useEffect(() => {
    fetchCompany();
    fetchListJob();
  }, [CompanyId]);

  useEffect(() => {
    handleFilterJob();
  }, [listJob, CompanyId]);

  const fetchCompany = async () => {
    const res = await getCompanyById(CompanyId);
    if (res && res.data && res.data.ec === 0) {
      setCompany(res.data.dt);
    } else {
      return;
    }
  };
  const fetchListJob = async () => {
    const res2 = await getAllJob();
    if (res2 && res2.data.ec === 0) {
      setListJob(res2.data.dt);
      // console.log(listJob);
    } else {
      return;
    }
  };

  const handleFilterJob = () => {
    let j = [];
    listJob.map((job, index) => {
      if (job && +job.companyId === +CompanyId) {
        j.push(job);
      }
    });
    setFilterJob(j);
  };

  const handleViewJob = (job) => {
    setShowModalJob(true);
    setJobData(job);
  };

  const resetJobData = () => {
    setJobData({});
  };

  return (
    <div className="company-detail-container">
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
      <div className="list-job container">
        <div className="title">
          <span>Việc đang tuyển</span>
        </div>
        <div className="content">
          {filterJob &&
            filterJob.length > 0 &&
            filterJob.map((job, index) => {
              return (
                <div
                  className="job container mt-3"
                  key={`job-${index + 1}`}
                  onClick={() => handleViewJob(job)}
                >
                  <div className="logo">
                    <img
                      src={company.logo}
                      style={{ height: "100%", cursor: "pointer" }}
                    />
                  </div>
                  <div className="job-detail">
                    <div className="mt-1">
                      <span className="j-title">{job.jobTitle}</span>
                    </div>
                    <div className="mt-1">
                      <span className="c-name">{company.companyName}</span>
                    </div>
                    <div className="d-flex my-1">
                      <BiCoinStack
                        size={"1.5rem"}
                        style={{ color: "#a1a15e" }}
                      />
                      <span className="j-salary">{job.salary}</span>
                      <span className="j-deadline">{job.deadline}</span>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <ModalViewJob
        show={showModalJob}
        setShow={setShowModalJob}
        jobData={jobData}
        resetJobData={resetJobData}
      />
    </div>
  );
};
export default JobPage;
