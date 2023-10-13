import * as Yup from "yup";

export const LoginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Enter a valid email format"
    )
    .required("Email is mandatory"),
  password: Yup.string().required("Password is mandatory"),
});
