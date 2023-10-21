import * as Yup from "yup";

export const LoginValidationSchema = (t) =>
  Yup.object().shape({
    email: Yup.string()
      .matches(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, t("invalidEmail"))
      .required(t("validation.required")),
    password: Yup.string().required(t("validation.required")),
  });
