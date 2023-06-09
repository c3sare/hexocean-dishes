import React from "react";
import * as style from "../styles/pizzaform.module.css";
import { UseFormRegisterReturn } from "react-hook-form";
import InputMask from "react-input-mask";

interface MaskInputProps {
  register: UseFormRegisterReturn;
  errors: any;
  label: string;
  mask: string;
  placeholder: string;
}

export default function MaskInput({
  register,
  errors,
  label,
  mask,
  placeholder,
}: MaskInputProps) {
  const name = register.name;

  return (
    <div>
      <label htmlFor={name}>{label}:</label>
      <InputMask
        id={name}
        mask={mask}
        {...register}
        {...(placeholder ? { placeholder } : {})}
        {...(errors?.preparation_time ? { className: style.error } : {})}
      />
      {errors?.[name] && (
        <span className={style.errorMessage}>{errors?.[name].message}</span>
      )}
    </div>
  );
}
