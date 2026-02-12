import {
  container,
  labelInput,
  boxInput,
  boxIcon,
  message,
} from "./style.module.scss";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa6";
import { useState } from "react";
function Input({ label, type, ...props }) {
  const isPassword = type === "password";
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);
  const isShowPassword = type === "password" && showPassword ? "text" : type;

  const messageErr =
    props.formik.touched[props.id] && props.formik.errors[props.id];

  return (
    <div className={container}>
      <div className={labelInput}>
        <label>{label}</label>
      </div>
      <div className={boxInput}>
        <input
          type={isShowPassword}
          {...props}
          onBlur={props.formik.handleBlur}
          onChange={props.formik.handleChange}
          value={props.formik.values[props.id]}
        />
        {isPassword && (
          <div className={boxIcon} onClick={handleShowPassword}>
            {showPassword ? <FaEyeSlash /> : <IoEyeSharp />}
          </div>
        )}
      </div>
      {messageErr && <div className={message}>{messageErr}</div>}
    </div>
  );
}

export default Input;
