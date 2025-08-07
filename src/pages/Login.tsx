import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useState } from "react";
import { loginSchema } from "../validation";
import axiosInstance from "../config/axios.config";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { IErrorMessage, ILoginForm } from "../interfaces";
import { LOGIN_FORM } from "../data";
import InputErrorMessage from "../components/ui/InputErrorMessage";
import { Link } from "react-router-dom";

interface IFormInput {
  identifier: string;
  password: string;
}
const LoginPage = () => {
  /* --------------------------------- States --------------------------------- */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(loginSchema) });
  const [isLoading, setIsLoading] = useState(false);
  /* -------------------------------- Handlers -------------------------------- */
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsLoading(true);
    try {
      const { status, data: result } = await axiosInstance.post(
        "/auth/local",
        data
      );
      if (status === 200) {
        toast.success("You will navigate to the home page after 2 seconds.", {
          position: "bottom-center",
          duration: 1500,
          style: {
            background: "#333",
            color: "#fff",
            borderRadius: "10px",
            padding: "16px",
          },
        });
      }
      localStorage.setItem("loggedInUser", JSON.stringify(result));
      setTimeout(() => {
        location.replace("/");
      }, 1500);
    } catch (error) {
      const errorObj = error as AxiosError<IErrorMessage>;
      toast.error(`${errorObj.response?.data.error?.message}`, {
        position: "bottom-center",
        duration: 1500,
      });
    } finally {
      setIsLoading(false);
    }
  };
  /* ---------------------------------- Renders ----------------------------------- */
  const renderLoginForm = LOGIN_FORM.map(
    ({ name, placeholder, type, validation }: ILoginForm, index: number) => (
      <div key={index}>
        <Input
          placeholder={placeholder}
          type={type}
          {...register(name, validation)}
        />
        {errors[name] && <InputErrorMessage msg={errors[name]?.message} />}
      </div>
    )
  );
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-center mb-4 text-3xl font-semibold">
        Login to get access!
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {renderLoginForm}
        <Button fullWidth isLoading={isLoading}>
          Login
        </Button>
      </form>
      <span className="block text-center mt-1 text-slate-500">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-indigo-700 hover:underline font-semibold"
        >
          Register
        </Link>
      </span>
    </div>
  );
};

export default LoginPage;
