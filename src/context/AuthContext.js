import { createContext, useContext, useMemo, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { users } from "../utils/data/users";

const AuthContext = createContext();

const initialState = {
  user: null,
};

const actionTypes = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
};

const authReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return { ...state, user: action.payload };
    case actionTypes.LOGOUT:
      return { ...state, user: null };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const navigate = useNavigate();

  const login = (email, password) => {
    const matchedUser = users?.find(
      (user) => user.email == email && user.password == password
    );

    if (matchedUser) {
      dispatch({ type: actionTypes.LOGIN, payload: matchedUser });
      navigate("/books-list");
    } else {
      alert("Login failed. Invalid email or password.");
    }
  };

  const logout = () => {
    dispatch({ type: actionTypes.LOGOUT });
    navigate("/login", { replace: true });
  };

  const value = useMemo(() => ({ ...state, login, logout }), [state]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
