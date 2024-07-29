import axios from "../axiosClient";

const postCreateNewTask = (project_id, name, description, deadline, status) => {
  const form = new FormData();
  form.append("project_id", project_id);
  form.append("name", name);
  form.append("description", description);
  form.append("deadline", deadline);
  form.append("status", status);

  return axios.post("v1/api/tasks", form);
};

const getListTask = (projectId) => {
  return axios.get(`v1/api/tasks?id=${projectId}`);
};

export { postCreateNewTask, getListTask };
