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
const getAllJob = () => {
  return axios.get("api/Job/GetAll");
};
const postCompany = (
  companyName,
  companyDescription,
  companyPhone,
  logo,
  location
) => {
  const form = new FormData();
  form.append("companyName", companyName);
  form.append("companyDescription", companyDescription);
  form.append("companyPhone", companyPhone);
  form.append("logo", logo);
  form.append("location", location);

  return axios.post("api/Company/PostCompany", form);
};

export {
  postCreateNewUser,
  getAllJob,
  getListCompany,
  getCompanyById,
  postCompany,
};
