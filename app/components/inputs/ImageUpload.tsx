"use client"

import { CldUploadWidget } from "next-cloudinary"
import Image from "next/image"
import { useCallback } from "react"
import { TbPhotoPlus } from "react-icons/tb"

declare global {
  var cloudinary: any
}

interface ImageUploadProps {
  onChange: (value: string) => void
  value: string
}

export default function ImageUpload({ onChange, value }: ImageUploadProps) {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url)
    },
    [onChange]
  )

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="bxtsjbwn"
      options={{ maxFiles: 1 }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="border-neytral-300 relative flex cursor-pointer flex-col items-center justify-center gap-4 border-2 border-dashed p-20 text-neutral-600 transition hover:opacity-70"
          >
            {value ? (
              <div className="absolute inset-0 h-full w-full">
                <Image
                  alt="Upload"
                  fill
                  style={{ objectFit: "cover" }}
                  src={value}
                />
              </div>
            ) : (
              <>
                <TbPhotoPlus size={40} />
                <div className="text-md font-semibold">Click to upload</div>
              </>
            )}
          </div>
        )
      }}
    </CldUploadWidget>
  )
}
