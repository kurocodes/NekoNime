import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthContext } from "../../context/AuthContext";
import { loginSchema } from "../../utils/validation/loginSchema";

import { FaLock } from "react-icons/fa";
import { FiAtSign } from "react-icons/fi";

import FormInput from "./FormInput";
import AuthFormWrapper from "./AuthFormWrapper";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const { setUser } = useAuthContext();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await login(data);
      console.log("Login Success: ", res.data);
      setUser(res.data.user);
      navigate("/");
    } catch (err) {
      const errMsg = err?.response?.data?.message || "Login Failed";
      console.error("Login failed:", err.response?.data || err.message);
      setError("root", { type: "manual", message: errMsg });
    }
  };

  return (
    <AuthFormWrapper
      onSubmit={handleSubmit(onSubmit)}
      isSubmitting={isSubmitting}
    >
      {errors.root && (
        <p className="text-red-500 bg-red-100 text-sm mt-4 py-2 text-center">
          {errors.root.message}
        </p>
      )}
      {/* Username */}
      <FormInput
        label="Username"
        name="username"
        type="text"
        formType="login"
        placeholder="Enter your username"
        register={register}
        error={errors.username}
        inputIcon={FiAtSign}
      />

      {/* Password */}
      <FormInput
        label="Password"
        name="password"
        type="password"
        formType="login"
        placeholder="Enter your password"
        register={register}
        error={errors.password}
        inputIcon={FaLock}
      />
    </AuthFormWrapper>
  );
}
