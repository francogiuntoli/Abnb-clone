"use client"

import { FieldErrors, FieldValues, Path, UseFormRegister } from "react-hook-form"
import { BiDollar } from "react-icons/bi"

interface InputProps<T extends FieldValues = FieldValues> {
  id: Path<T>;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  formatPrice?: boolean;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function Input<T extends FieldValues = FieldValues>({
  id,
  label,
  type,
  disabled,
  formatPrice,
  required,
  register,
  errors,
  onKeyDown,
}: InputProps<T>) {
  const fieldError = errors[id as keyof typeof errors];

  return (
    <div className="relative w-full">
      {formatPrice && (
        <BiDollar size={24} className="absolute left-2 top-5 text-neutral-700" />
      )}

      <input
        autoComplete="new-password"
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        type={type}
        onKeyDown={onKeyDown}
        className={`peer w-full rounded-md border-2 bg-white p-4 pt-6 font-light outline-none transition
          disabled:cursor-not-allowed disabled:opacity-70
          ${formatPrice ? "pl-9" : "pl-4"}
          ${fieldError ? "border-rose-500 focus:border-rose-500" : "border-neutral-300 focus:border-black"}
        `}
      />

      <label
        className={`text-md absolute top-5 z-10 origin-[0] -translate-y-3 transform duration-150
          ${formatPrice ? "left-9" : "left-4"}
          peer-placeholder-shown:translate-y-0
          peer-placeholder-shown:scale-100
          peer-focus:-translate-y-4
          peer-focus:scale-75
          ${fieldError ? "text-rose-500" : "text-zinc-400"}
        `}
      >
        {label}
      </label>
    </div>
  );
}
