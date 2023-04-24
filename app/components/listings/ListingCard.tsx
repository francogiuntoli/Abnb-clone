"use client"

import { SafeUser } from "@/app/types"
import { Listing, Reservation } from "@prisma/client"
import { format } from "date-fns"

import useCountries from "@/app/hooks/useCountries"
import { useRouter } from "next/navigation"
import { useCallback, useMemo } from "react"

import Image from "next/image"
import HeartButton from "./HeartButton"
interface ListingCardProps {
  data: Listing
  reservation?: Reservation
  onAction?: (id: string) => void
  disabled?: boolean
  actionLabel?: string
  actionId?: string
  currentUser?: SafeUser | null
}

export default function ListingCard({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currentUser,
}: ListingCardProps) {
  const router = useRouter()
  const { getByValue } = useCountries()
  const location = getByValue(data.locationValue)

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      if (disabled) return

      onAction?.(actionId)
    },
    [onAction, disabled, actionId]
  )

  const price = useMemo(() => {
    if (reservation) return reservation.totalPrice

    return data.price
  }, [reservation, data.price])

  const reservationDate = useMemo(() => {
    if (!reservation) return null

    const start = new Date(reservation.startDate)
    const end = new Date(reservation.endDate)

    return `${format(start, "PP")} - ${format(end, "PP")}`
  }, [reservation])

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="group col-span-1 cursor-pointer"
    >
      <div className="flex w-full flex-col gap-2">
        <div className="relative aspect-square w-full overflow-hidden rounded-xl">
          <Image
            fill
            alt="listing"
            src={data.imageSrc}
            className="h-full w-full object-cover transition group-hover:scale-110"
          />
          <div className="absolute right-3 top-3">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
      </div>
    </div>
  )
}
