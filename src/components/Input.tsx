import React from "react";
import * as style from "../styles/pizzaform.module.css";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  register: UseFormRegisterReturn;
  errors: any;
  label: string;
  type: "number" | "text";
  step?: string;
}

export default function Input({
  register,
  errors,
  label,
  type,
  step,
}: InputProps) {
  const name = register.name;

  return (
    <div>
      <label htmlFor={name}>{label}:</label>
      <input
        id={name}
        {...(step ? { step } : {})}
        type={type}
        {...register}
        {...(errors?.[name] ? { className: style.error } : {})}
      />
      {errors?.[name] && (
        <span className={style.errorMessage}>{errors?.[name].message}</span>
      )}
    </div>
  );
}
