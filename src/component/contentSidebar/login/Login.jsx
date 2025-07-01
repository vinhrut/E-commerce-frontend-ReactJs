import Input from "../../inputCommon/Input";
import style from "./style.module.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useContext, useState } from "react";
import { ToastContext } from "../../../contexts/ToastProvider";
import { register, signIn } from "../../../apis/authService";
import Cookies from "js-cookie";
import { SidebarContext } from "../../../contexts/SidebarProvider";
import { StoreContext } from "../../../contexts/storeProvider";

function Login() {
  const { container, remember, title, forgot, signupClass } = style;
  const [isSignUp, setIsSignUp] = useState(false);
  const { toast } = useContext(ToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const { setIsOpen, type } = useContext(SidebarContext);
  const { setUserId } = useContext(StoreContext);

  const moveToSignUp_or_Login = () => {
    setIsSignUp(!isSignUp);
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(8, "Must be 8 characters or more")
        .required("Required"),
      ...(isSignUp && {
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("password"), null], "Passwords must match")
          .required("Required"),
      }),
    }),
    onSubmit: async (values) => {
      if (isLoading) {
        return;
      }
      if (isSignUp) {
        setIsLoading(true);
        await register({
          username: values.email,
          password: values.password,
        })
          .then((res) => {
            toast.success(res.data.message);
            setIsLoading(false);
            moveToSignUp_or_Login();
          })
          .catch((err) => {
            console.log(err);
            toast.error(err.response.data.message);
            setIsLoading(false);
          });
      }

      if (!isSignUp) {
        setIsLoading(true);

        await signIn({
          username: values.email,
          password: values.password,
        })
          .then((res) => {
            Cookies.set("token", res.data.token);
            Cookies.set("refreshToken", res.data.refreshToken);
            Cookies.set("userId", res.data.id);
            toast.success("Sign in successfully");
            setUserId(res.data.id);
            setIsLoading(false);
            setIsOpen(false);
          })
          .catch((err) => {
            console.log(err);
            toast.error(err.response.data.message);
            setIsLoading(false);
          });
      }
    },
  });

  return (
    <div className={container}>
      <div className={title}>
        <h2>{isSignUp ? "SIGN UP" : "LOG IN"}</h2>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <Input id="email" label="Email *" type="text" formik={formik} />
        <Input
          id="password"
          label="Password *"
          type="password"
          formik={formik}
        />
        {isSignUp ? (
          <Input
            id="confirmPassword"
            label="Confirm Password *"
            type="password"
            formik={formik}
          />
        ) : (
          <div className={remember}>
            <input type="checkbox" value="" />
            Remember me
          </div>
        )}

        <div
          style={{ marginTop: "10px" }}
          className={signupClass}
          onClick={() => moveToSignUp_or_Login()}
        >
          {isSignUp ? "Already have an account ?" : "Don't have an account ?"}
        </div>
        <button type="submit">
          {isLoading ? "Loading..." : isSignUp ? "SIGN UP" : "LOG IN"}
        </button>
      </form>
      <div className={forgot}>Forgot Password ?</div>
    </div>
  );
}

export default Login;
