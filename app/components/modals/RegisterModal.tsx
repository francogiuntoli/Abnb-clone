"use client"

import axios from "axios"
import { AiFillGithub } from "react-icons/ai"
import { FcGoogle } from "react-icons/fc"
import { useCallback, useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"

import useRegisterModal from "@/app/hooks/useRegisterModal"
import Modal from "./Modal"
import Heading from "../Heading"
import Input from "../inputs/Input"
import { toast } from "react-hot-toast"
import Button from "../Button"
import { signIn } from "next-auth/react"
import useLoginModal from "@/app/hooks/useLoginModal"
import { registerSchema, RegisterSchema } from "@/app/libs/schemas/registerSchema"
import { zodResolver } from "@hookform/resolvers/zod"

export default function RegisterModal() {
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)
    axios
      .post("/api/register", data)
      .then(() => {
        toast.success("User created!")
        registerModal.onClose()
        loginModal.onOpen()
      })
      .catch((error) => {
        toast.error("Something went wrong")
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const toggle = useCallback(() => {
    loginModal.onOpen()
    registerModal.onClose()
  }, [loginModal, registerModal])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to NewBieNB" subtitle="Create an account!" />
      <Input<RegisterSchema>
        id="email"
        label="Email"
        register={register}
        disabled={isLoading}
        errors={errors}
        required
        type="email"
      />
      <Input<RegisterSchema>
        id="name"
        label="Name"
        register={register}
        disabled={isLoading}
        errors={errors}
        required
      />
      <Input<RegisterSchema>
        id="password"
        label="Password"
        type="password"
        register={register}
        disabled={isLoading}
        errors={errors}
        required
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit(onSubmit)()
          }
        }}
      />
    </div>
  )

  const footerContent = (
    <div className="mt-3 flex flex-col gap-2">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn("google")}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn("github")}
      />
      <div className="mt-4 text-center font-light text-neutral-500">
        <div className="flex flex-row items-center justify-center gap-2">
          <div>Already have an account?</div>
          <div
            onClick={toggle}
            className="cursor-pointer text-neutral-800 hover:underline"
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading || !!errors}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}
