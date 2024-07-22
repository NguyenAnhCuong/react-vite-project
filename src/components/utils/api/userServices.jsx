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

const postUpdateUser = (id, name, email, image, role) => {
  const form = new FormData();
  form.append("id", id);
  form.append("name", name);
  form.append("email", email);
  form.append("image", image);
  form.append("role", role);

  return axios.put("v1/api/users", form);
};

const deleteUser = (id) => {
  return axios.delete("v1/api/users", { data: { id: id } });
};

export {
  postCreateNewUser,
  getAllListUserPaginate,
  postUpdateUser,
  deleteUser,
};
