import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import FormInputIcon from "./FormInputIcon";

export default function FormInput({
  label,
  type,
  name,
  formType,
  placeholder,
  register,
  error,
  inputIcon,
}) {
  const id = `${formType}-${name}-input`;

  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative mt-4">
      <div
        className={`w-full border-3 rounded-md flex transition duration-200 ${
          error
            ? "border-red-500"
            : isFocused
            ? "border-primary"
            : "border-secondary"
        }`}
      >
        {/* Input Icon */}
        <FormInputIcon Icon={inputIcon} error={error} isFocused={isFocused} />

        {/* Input Field */}
        <input
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          name={name}
          id={id}
          placeholder={placeholder}
          className="grow px-3 max-xs:w-[170px] py-2 text-md bg-white text-secondary rounded-md outline-0 transition-all duration-200 focus:text-primary"
          {...register(name)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {/* Show And hide password if type is password */}
        {type === "password" && (
          <FormInputIcon
            Icon={showPassword ? FaEye : FaEyeSlash}
            error={error}
            isFocused={isFocused}
            onClick={() => setShowPassword(!showPassword)}
          />
        )}
      </div>
      {error && (
        <p className="text-red-500 text-xs mt-1 px-1">{error.message}</p>
      )}
    </div>
  );
}
