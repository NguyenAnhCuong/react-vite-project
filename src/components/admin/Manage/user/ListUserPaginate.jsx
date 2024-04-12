import { useState } from "react";
import { useTranslation } from "react-i18next";
import ReactPaginate from "react-paginate";

const ListUserPaginate = (props) => {
  const { t } = useTranslation();
  const { listUser, setListUser, pageCount } = props;

  const handlePageClick = (event) => {
    props.fetchListUserWithPaginate(+event.selected + 1);
    props.setCurrentPage(+event.selected + 1);
  };

  return (
    <>
      <table className="table table-hover table-bordered mx-3 my-3">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">{t("admin.manageuser.userPaginate.username")}</th>
            <th scope="col">{t("admin.manageuser.userPaginate.email")}</th>
            <th scope="col">{t("admin.manageuser.userPaginate.role")}</th>
            <th scope="col">{t("admin.manageuser.userPaginate.action")}</th>
          </tr>
        </thead>
        <tbody>
          {listUser &&
            listUser.length > 0 &&
            listUser.map((user, index) => {
              return (
                <tr key={`table-user-${index}`}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button className="btn btn-info mx-2">
                      {t("admin.manageuser.userPaginate.btn.view")}
                    </button>
                    <button
                      className="btn btn-warning mx-2"
                      onClick={() => props.handleClickUpdateUser(user)}
                    >
                      {t("admin.manageuser.userPaginate.btn.update")}
                    </button>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => props.handleClickDeleteUser(user)}
                    >
                      {t("admin.manageuser.userPaginate.btn.delete")}
                    </button>
                  </td>
                </tr>
              );
            })}
          {listUser && listUser === 0 && (
            <tr>
              <td colSpan={"5"}>
                {" "}
                {t("admin.manageuser.userPaginate.noData")}
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="d-flex justify-content-center">
        <ReactPaginate
          nextLabel="Next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="< Previous"
          pageLinkClassName="page-link"
          pageClassName="page-item"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          forcePage={props.currentPage - 1}
        />
      </div>
    </>
  );
};
export default ListUserPaginate;
