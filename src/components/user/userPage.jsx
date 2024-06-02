import { useEffect, useState } from "react";
import { getListCompany } from "../utils/api/ApiServices";
import { toast } from "react-toastify";
import "./userPage.scss";

const UserPage = () => {
  const [listCompany, setListCompany] = useState([]);

  useEffect(() => {
    fetchListCompany();
  }, []);

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + "...";
  };

  const fetchListCompany = async () => {
    const res = await getListCompany();
    if (res && res.data && res.data.ec === 0) {
      setListCompany(res.data.dt);
      toast.success(res.data.em);
    } else {
      toast.error(res.data.em);
      return;
    }
  };

  return (
    <div className="list-company-container">
      {listCompany &&
        listCompany.length > 0 &&
        listCompany.map((company, index) => {
          return (
            <div
              key={`${index}-company`}
              className="card"
              style={{ width: "18rem" }}
            >
              <img
                className="card-img-top"
                style={{ width: "150px" }}
                src={company.logo}
                // data:image/jpeg;base64,$
                alt="Card image cap"
              />
              <div className="card-body">
                <h5 className="card-title">{company.companyName}</h5>
                <p className="card-text">
                  {truncateText(company.companyDescription, 50)}
                </p>
                <button className="btn btn-primary">Find Out</button>
              </div>
            </div>
          );
        })}
      {listCompany && listCompany.length === 0 && (
        <div>We dont have any Company...</div>
      )}
    </div>
  );
};

export default UserPage;
