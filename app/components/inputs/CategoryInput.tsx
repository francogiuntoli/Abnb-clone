"use client"

import { IconType } from "react-icons"

interface CategoryInputProps {
  label: string
  icon: IconType
  onClick: (value: string) => void
  selected: boolean
}

export default function CategoryInput({
  label,
  icon: Icon,
  onClick,
  selected,
}: CategoryInputProps) {
  return (
    <div
      onClick={() => onClick(label)}
      className={`flex cursor-pointer flex-col gap-3 rounded-xl border-2 p-4 transition hover:border-black
       ${selected ? "border-black" : "border-neutral-200"}`}
    >
      <Icon size={30} />
      <div className="font-semibold"> {label}</div>
    </div>
  )
}
