import ReactPaginate from "react-paginate";

const ListUser = (props) => {
  const { listUser, pageCount } = props;

  const handlePageClick = (event) => {
    props.fetchListUser(+event.selected + 1);
    props.setCurrentPage(+event.selected + 1);
  };

  return (
    <>
      <table
        className="table table-hover table-bordered mx-3 my-3"
        style={{ height: "400px" }}
      >
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Email</th>
            <th scope="col">Password</th>
            <th scope="col">Role</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {listUser &&
            listUser.length > 0 &&
            listUser.map((user, index) => {
              return (
                <tr key={`user-${index + 1}`}>
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td>{user.role}</td>
                  <td>
                    <button className="btn btn-info mx-2" onClick={() => {}}>
                      View
                    </button>
                    <button className="btn btn-warning mx-2" onClick={() => {}}>
                      Update
                    </button>
                    <button className="btn btn-danger mx-2" onClick={() => {}}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          {listUser && listUser === 0 && (
            <tr>
              <td colSpan={"5"}>No data</td>
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
export default ListUser;
