import axios from "axios";
import { setAlert } from "./alert";
import {
  REGISTER_EDUCATOR_SUCCESS,
  REGISTER_EDUCATOR_FAIL,
  EDUCATOR_LOADED,
  AUTH_EDUCATOR_ERROR,
  LOGIN_EDUCATOR_SUCCESS,
  LOGIN_EDUCATOR_FAIL,
  LOGOUT_EDUCATOR,
  CLEAR_PROFILE,
} from "./types";
import setAuthToken from "../utils/setAuthToken";

// Load Educators
export const loadEducator = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/authEducator");

    dispatch({
      type: EDUCATOR_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_EDUCATOR_ERROR,
    });
  }
};

// Register Educator
export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ name, email, password });
    try {
      const res = await axios.post("/api/educators", body, config);
      console.log(res);

      dispatch({
        type: REGISTER_EDUCATOR_SUCCESS,
        payload: res.data,
      });
      dispatch(loadEducator());
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }

      dispatch({
        type: REGISTER_EDUCATOR_FAIL,
      });
    }
  };

// Login Educator
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post("/api/authEducator", body, config);

    dispatch({
      type: LOGIN_EDUCATOR_SUCCESS,
      payload: res.data,
    });
    dispatch(loadEducator());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: LOGIN_EDUCATOR_FAIL,
    });
  }
};

// Logout/ clear Profile
export const logout_educator = () => (dispatch) => {
  dispatch({
    type: CLEAR_PROFILE,
  });
  dispatch({
    type: LOGOUT_EDUCATOR,
  });
};
