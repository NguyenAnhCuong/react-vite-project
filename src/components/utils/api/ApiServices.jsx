// import axios from "axios";
import axios from "../axiosClient";

const postCreateNewUser = (email, password, username, role, image) => {
  const form = new FormData();
  form.append("email", email);
  form.append("password", password);
  form.append("username", username);
  form.append("role", role);
  form.append("userImage", image);

  return axios.post("api/v1/participant", form);
};

const getListCompany = () => {
  return axios.get("api/Company/GetAll");
};

const getCompanyById = (companyId) => {
  return axios.get(`api/Company/GetCompany/${companyId}`);
};

export { postCreateNewUser, getListCompany, getCompanyById };
