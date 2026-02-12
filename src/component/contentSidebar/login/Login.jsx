import Input from "../../inputCommon/Input";
import style from "./style.module.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useContext, useState } from "react";
import { ToastContext } from "../../../contexts/ToastProvider";
import { register, signIn } from "../../../apis/authService";
import { SidebarContext } from "../../../contexts/SidebarProvider";
import { StoreContext } from "../../../contexts/storeProvider";

function Login() {
  const { container, remember, title, forgot, signupClass } = style;
  const [isSignUp, setIsSignUp] = useState(false);
  const { toast } = useContext(ToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const { setIsOpen } = useContext(SidebarContext);
  const { handleLoginSuccess } = useContext(StoreContext);

  const moveToSignUp_or_Login = () => {
    setIsSignUp(!isSignUp);
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Email không hợp lệ").required("Bắt buộc"),
      password: Yup.string()
        .min(8, "Mật khẩu ít nhất 8 ký tự")
        .required("Bắt buộc"),
      ...(isSignUp && {
        fullName: Yup.string().required("Bắt buộc"),
        phone: Yup.string()
          .matches(/^\d{9,11}$/, "Số điện thoại không hợp lệ")
          .required("Bắt buộc"),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("password"), null], "Mật khẩu không khớp")
          .required("Bắt buộc"),
      }),
    }),
    onSubmit: async (values) => {
      if (isLoading) return;

      if (isSignUp) {
        setIsLoading(true);
        try {
          // Backend UserCreate: { fullName, email, password, phone }
          const res = await register({
            fullName: values.fullName,
            email: values.email,
            password: values.password,
            phone: values.phone,
          });
          // res là response.data: { code, message, result }
          if (res.code === 1000) {
            toast.success("Đăng ký thành công! Vui lòng đăng nhập.");
            moveToSignUp_or_Login();
          } else {
            toast.error(res.message || "Đăng ký thất bại!");
          }
        } catch (err) {
          console.error(err);
          toast.error(
            err.response?.data?.message || "Đăng ký thất bại, thử lại!"
          );
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(true);
        try {
          // Backend AuthenticationRequest: { email, password }
          const res = await signIn({
            email: values.email,
            password: values.password,
          });
          // res là response.data: { code, message, result: AuthenticationResponse }
          if (res.code === 1000) {
            handleLoginSuccess(res.result);
            toast.success("Đăng nhập thành công!");
            setIsOpen(false);
          } else {
            toast.error(res.message || "Đăng nhập thất bại!");
          }
        } catch (err) {
          console.error(err);
          toast.error(
            err.response?.data?.message || "Email hoặc mật khẩu sai!"
          );
        } finally {
          setIsLoading(false);
        }
      }
    },
  });

  return (
    <div className={container}>
      <div className={title}>
        <h2>{isSignUp ? "ĐĂNG KÝ" : "ĐĂNG NHẬP"}</h2>
      </div>
      <form onSubmit={formik.handleSubmit}>
        {isSignUp && (
          <Input id="fullName" label="Họ và tên *" type="text" formik={formik} />
        )}
        <Input id="email" label="Email *" type="text" formik={formik} />
        {isSignUp && (
          <Input id="phone" label="Số điện thoại *" type="text" formik={formik} />
        )}
        <Input
          id="password"
          label="Mật khẩu *"
          type="password"
          formik={formik}
        />
        {isSignUp ? (
          <Input
            id="confirmPassword"
            label="Xác nhận mật khẩu *"
            type="password"
            formik={formik}
          />
        ) : (
          <div className={remember}>
            <input type="checkbox" value="" />
            Ghi nhớ đăng nhập
          </div>
        )}

        <div
          style={{ marginTop: "10px" }}
          className={signupClass}
          onClick={moveToSignUp_or_Login}
        >
          {isSignUp ? "Đã có tài khoản? Đăng nhập" : "Chưa có tài khoản? Đăng ký"}
        </div>
        <button type="submit">
          {isLoading ? "Đang xử lý..." : isSignUp ? "ĐĂNG KÝ" : "ĐĂNG NHẬP"}
        </button>
      </form>
      <div className={forgot}>Quên mật khẩu?</div>
    </div>
  );
}

export default Login;
