import axios from "../axiosClient";

const postCreateNewUser = (email, password, name, role, image) => {
  const form = new FormData();
  form.append("email", email);
  form.append("password", password);
  form.append("name", name);
  form.append("role", role);
  form.append("image", image);

  return axios.post("v1/api/users", form);
};

const getAllListUserPaginate = (limit, page) => {
  return axios.get(`v1/api/users?limit=${limit}&page=${page}`);
};

export { postCreateNewUser, getAllListUserPaginate };
