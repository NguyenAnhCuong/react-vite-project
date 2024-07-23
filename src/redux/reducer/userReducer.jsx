import {
  FETCH_USER_LOGIN_SUCCESS,
  USER_LOGOUT_SUCCESS,
  doLogin,
} from "../action/userAction";

const INITIAL_STATE = {
  account: {
    token: "",
    // refresh_token: "",
    name: "",
    image: "",
    role: "",
    email: "",
  },
  isAuthenticated: false,
};
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_LOGIN_SUCCESS:
      return {
        ...state,
        account: {
          token: action?.payload?.token,
          // refresh_token: action?.payload?.DT?.refresh_token,
          name: action?.payload?.data?.name,
          image: action?.payload?.data?.image,
          role: action?.payload?.data?.role,
          email: action?.payload?.data?.email,
        },
        isAuthenticated: true,
      };
    case USER_LOGOUT_SUCCESS:
      return {
        ...state,
        account: {
          token: "",
          // refresh_token: "",
          name: "",
          image: "",
          role: "",
          email: "",
        },
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default userReducer;
