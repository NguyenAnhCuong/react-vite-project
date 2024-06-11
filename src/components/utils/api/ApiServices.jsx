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
const deleteCompany = (id) => {
  return axios.delete(`/api/Company/Delete/${id}`);
};
const postJob = (jobTitle, jobDescription, salary, deadline, companyId) => {
  const form = new FormData();
  form.append("jobTitle", jobTitle);
  form.append("jobDescription", jobDescription);
  form.append("salary", salary);
  form.append("deadline", deadline);
  form.append("companyId", companyId);

  return axios.post("api/Job/PostJob", form);
};
const updateJob = (jobTitle, jobDescription, salary, deadline, companyId) => {
  const form = new FormData();
  form.append("jobTitle", jobTitle);
  form.append("jobDescription", jobDescription);
  form.append("salary", salary);
  form.append("deadline", deadline);
  form.append("companyId", companyId);

  return axios.put("api/Job/PostJob", form);
};
const deleteJob = (id) => {
  return axios.delete(`/api/Job/Delete/${id}`);
};
const getJobById = (id) => {
  return axios.get(`/api/Job/GetJob/${id}`);
};
const updateCompany = (
  companyId,
  companyName,
  companyDescription,
  companyPhone,
  logo,
  location
) => {
  const form = new FormData();
  form.append("companyId", companyId);
  form.append("companyName", companyName);
  form.append("companyDescription", companyDescription);
  form.append("companyPhone", companyPhone);
  form.append("logo", logo);
  form.append("location", location);

  return axios.put(`api/Company/Update/${companyId}`, form);
};

export {
  updateCompany,
  getJobById,
  postJob,
  deleteJob,
  deleteCompany,
  postCreateNewUser,
  getAllJob,
  getListCompany,
  getCompanyById,
  postCompany,
};
