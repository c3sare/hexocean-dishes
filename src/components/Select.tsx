import React from "react";
import * as style from "../styles/pizzaform.module.css";
import { UseFormRegisterReturn } from "react-hook-form";

interface SelectProps {
  register: UseFormRegisterReturn;
  options: string[];
  label: string;
  errors: any;
}

export default function Select({
  register,
  options,
  label,
  errors,
}: SelectProps) {
  const name = register.name;

  return (
    <div>
      <label>{label}:</label>
      <select {...register}>
        {options.map((option) => (
          <option value={option}>{option}</option>
        ))}
      </select>
      {errors?.[name] && (
        <span className={style.errorMessage}>{errors?.[name].message}</span>
      )}
    </div>
  );
}
