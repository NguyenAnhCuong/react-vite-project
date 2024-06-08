import { useEffect, useState } from "react";
import { getListCompany } from "../../../utils/api/ApiServices";
import ModalViewCompany from "./ModalViewCompany";

const ListCompany = (props) => {
  const { listCompany } = props;

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + "...";
  };

  return (
    <>
      <table className="table table-hover table-bordered mx-3 my-3">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Phone</th>
            <th scope="col">Location</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {listCompany &&
            listCompany.length > 0 &&
            listCompany.map((company, index) => {
              return (
                <tr key={`company-${index}`}>
                  <td>{company.companyId}</td>
                  <td>{company.companyName}</td>
                  <td>{company.companyDescription}</td>
                  {/* <td>{truncateText(company.companyDescription, 100)}</td> */}
                  <td>{company.companyPhone}</td>
                  <td>{company.location}</td>
                  <td>
                    <button
                      className="btn btn-info mx-2 my-1"
                      onClick={() => props.handleViewCompany(company)}
                    >
                      View
                    </button>
                    <button className="btn btn-warning mx-2">Update</button>
                    <button
                      className="btn btn-danger mx-2 my-1"
                      onClick={() => props.handleDeleteCompany(company)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};
export default ListCompany;
