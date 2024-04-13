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

const getQuizByUser = () => {
  return axios.get("/api/v1/quiz-by-participant");
};
const getDataQuiz = (quizId) => {
  return axios.get(`/api/v1/questions-by-quiz?quizId=${quizId}`);
};
const postSubmitQuiz = (data) => {
  return axios.post(`/api/v1/quiz-submit`, {
    ...data,
  });
};
const addNewQuiz = (description, name, difficulty, quizImage) => {
  const form = new FormData();
  form.append("description", description);
  form.append("name", name);
  form.append("difficulty", difficulty);
  form.append("quizImage", quizImage);
  return axios.post("api/v1/quiz", form);
};
const getAllQuizforAdmin = () => {
  return axios.get(`api/v1/quiz/all`);
};
const UpdateQuizforAdmin = (id, name, description, difficulty, image) => {
  const form = new FormData();
  form.append("id", id);
  form.append("description", description);
  form.append("name", name);
  form.append("difficulty", difficulty);
  form.append("quizImage", image);
  return axios.put("api/v1/quiz", form);
};
const deleteQuizForAdmin = (id) => {
  return axios.delete(`api/v1/quiz/${id}`);
};
const postCreateNewQuestionForQuiz = (quiz_id, description, questionImage) => {
  const form = new FormData();
  form.append("quiz_id", quiz_id);
  form.append("description", description);
  form.append("questionImage", questionImage);
  return axios.post("api/v1/question", form);
};
const postCreateNewAnswerForQuestion = (
  description,
  correct_answer,
  question_id
) => {
  return axios.post("api/v1/answer", {
    description,
    correct_answer,
    question_id,
  });
};
const postAssignQuizToUser = (quizId, userId) => {
  return axios.post("api/v1/quiz-assign-to-user", {
    quizId,
    userId,
  });
};
const getQuizWithQA = (quizId) => {
  return axios.get(`api/v1/quiz-with-qa/${quizId}`);
};
const postUpsertQA = (data) => {
  return axios.post(`api/v1/quiz-upsert-qa`, { ...data });
};
const LogOut = (email, refresh_token) => {
  return axios.post(`api/v1/logout`, {
    email,
    refresh_token,
  });
};
const getOverview = () => {
  return axios.get(`api/v1/overview`);
};
const UpdateUserInfo = (username, userImage) => {
  const form = new FormData();
  form.append("username", username);
  form.append("userImage", userImage);
  return axios.post("api/v1/profile", form);
};
const ChangeUserPassword = (current_password, new_password) => {
  return axios.post(`api/v1/change-password`, {
    current_password,
    new_password,
  });
};
const getHistory = () => {
  return axios.get(`api/v1/history`);
};

export {
  getHistory,
  ChangeUserPassword,
  UpdateUserInfo,
  getOverview,
  LogOut,
  postUpsertQA,
  getQuizWithQA,
  postAssignQuizToUser,
  postCreateNewAnswerForQuestion,
  postCreateNewQuestionForQuiz,
  deleteQuizForAdmin,
  UpdateQuizforAdmin,
  getAllQuizforAdmin,
  addNewQuiz,
  postSubmitQuiz,
  getDataQuiz,
  getQuizByUser,
  postRegister,
  postCreateNewUser,
  DeleteUser,
  getAllUser,
  UpdateUser,
  getUserWithPaginate,
  postLogin,
};
