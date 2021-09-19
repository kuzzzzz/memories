import { AUTH } from "../constants/actionTypes";
import * as api from "../api/api";

export const signin = (formDate, history) => async (dispatch) => {
  try {
    history.push("/");
  } catch (error) {
    console.log(error);
  }
};
export const signup = (formDate, history) => async (dispatch) => {
  try {
    history.push("/");
  } catch (error) {
    console.log(error);
  }
};
