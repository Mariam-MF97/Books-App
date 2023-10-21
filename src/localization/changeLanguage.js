import { createTheme } from "@mui/material";
import i18n from "./i18n";

export const changeLanguage = (newLanguage) => {
  const newDirection = newLanguage === "ar" ? "rtl" : "ltr";

  i18n.changeLanguage(newLanguage);
  localStorage.setItem("language", newLanguage);
  document.documentElement.dir = newDirection;
};
