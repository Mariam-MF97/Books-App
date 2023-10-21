import { createContext, useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { users } from "../utils/data/users";

const AuthContext = createContext();

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
};

const actionTypes = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
};

const authReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      localStorage.setItem("user", JSON.stringify(action.payload));
      return { ...state, user: action.payload };
    case actionTypes.LOGOUT:
      localStorage.removeItem("user");
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
      (user) => user.email === email && user.password === password
    );

    if (matchedUser) {
      dispatch({ type: actionTypes.LOGIN, payload: matchedUser });
      navigate("/books-list", { replace: true });
    } else {
      alert("Login failed. Invalid email or password.");
    }
  };

  const logout = () => {
    dispatch({ type: actionTypes.LOGOUT });
    navigate("/login", { replace: true });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
