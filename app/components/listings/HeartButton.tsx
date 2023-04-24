"use client"

import { SafeUser } from "@/app/types"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"

interface HeartButtonProps {
  listingId: string
  currentUser?: SafeUser | null
}

export default function HeartButton({
  currentUser,
  listingId,
}: HeartButtonProps) {
  const hasFavorited = false
  const toggleFavorite = () => {}
  return (
    <div
      onClick={toggleFavorite}
      className="hover:opactity-80 relative cursor-pointer transition"
    >
      <AiOutlineHeart
        size={28}
        className="absolute -right-[2px] -top-[2px] fill-white"
      />
      <AiFillHeart
        size={24}
        className={hasFavorited ? "fill-rose-500" : "fill-neutral-500/70"}
      />
    </div>
  )
}
