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

const getAllUser = () => {
  return axios.get("api/v1/participant/all");
};

const UpdateUser = (id, username, role, image) => {
  const form = new FormData();
  form.append("id", id);
  form.append("username", username);
  form.append("role", role);
  form.append("userImage", image);
  return axios.put("api/v1/participant", form);
};
const DeleteUser = (id) => {
  return axios.delete("api/v1/participant", { data: { id: id } });
};
const getUserWithPaginate = (page, limit) => {
  return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
};
const postLogin = (email, password) => {
  return axios.post(`api/v1/login`, {
    email,
    password,
    // delay:5000
  });
};
const postRegister = (email, password, username) => {
  return axios.post(`api/v1/register`, { email, password, username });
};

export {
  postRegister,
  postCreateNewUser,
  DeleteUser,
  getAllUser,
  UpdateUser,
  getUserWithPaginate,
  postLogin,
};
