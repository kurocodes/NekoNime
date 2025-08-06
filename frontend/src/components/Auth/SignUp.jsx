import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { signup } from "../../services/authService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthContext } from "../../context/AuthContext";
import { signupSchema } from "../../utils/validation/signupSchema";

import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FiAtSign } from "react-icons/fi";

import FormInput from "./FormInput";
import AuthFormWrapper from "./AuthFormWrapper";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: zodResolver(signupSchema),
  });
  const { setUser } = useAuthContext();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await signup(data);
      console.log("Signup success: ", res.data);
      setUser(res.data.user);
      navigate("/");
    } catch (err) {
      const errMsg = err?.response?.data?.message || "Sign Up Failed";
      console.error("Signup failed:", err.response?.data || err.message);
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
        formType="signup"
        placeholder="Enter your username"
        register={register}
        error={errors.username}
        inputIcon={FiAtSign}
      />

      {/* Email */}
      <FormInput
        label="Email"
        name="email"
        type="email"
        formType="signup"
        placeholder="Enter your email"
        register={register}
        error={errors.email}
        inputIcon={MdEmail}
      />

      {/* Password */}
      <FormInput
        label="Password"
        name="password"
        type="password"
        formType="signup"
        placeholder="Enter your password"
        register={register}
        error={errors.password}
        inputIcon={FaLock}
      />

      {/* Confirm Password */}
      <FormInput
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        formType="signup"
        placeholder="Re-enter your password"
        register={register}
        error={errors.confirmPassword}
        required={{ value: true, message: "Please confirm your password" }}
        inputIcon={FaLock}
      />
    </AuthFormWrapper>
  );
}
