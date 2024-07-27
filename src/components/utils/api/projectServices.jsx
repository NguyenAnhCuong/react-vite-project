import axios from "../axiosClient";

const postCreateNewProject = (name, description, start_date, end_date) => {
  const form = new FormData();
  form.append("name", name);
  form.append("description", description);
  form.append("start_date", start_date);
  form.append("end_date", end_date);

  return axios.post("v1/api/projects", form);
};

const putUpdateProject = (id, name, description, start_date, end_date) => {
  const form = new FormData();
  form.append("id", id);
  form.append("name", name);
  form.append("description", description);
  form.append("start_date", start_date);
  form.append("end_date", end_date);

  return axios.put("v1/api/projects", form);
};

const getListProject = () => {
  return axios.get("v1/api/projects");
};

const deleteProject = (id) => {
  return axios.delete("v1/api/projects", { data: { id: id } });
};

export {
  postCreateNewProject,
  getListProject,
  deleteProject,
  putUpdateProject,
};
