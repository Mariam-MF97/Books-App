import { useForm } from "react-hook-form";
import LoginForm from "../../components/LoginForm";
import { LoginInitialValues } from "../../utils/initialValues/LoginInitialValues";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginValidationSchema } from "../../utils/validations/LoginValidation";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const { control, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: LoginInitialValues,
    resolver: yupResolver(LoginValidationSchema),
  });

  const onSubmit = (data) => {
    const { email, password } = data;
    login(email, password);
  };
  return <LoginForm control={control} onSubmit={handleSubmit(onSubmit)} />;
};

export default Login;
