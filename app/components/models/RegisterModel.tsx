"use client"
import axios from "axios"
import { AiFillGithub } from "react-icons/ai"
import {FcGoogle} from "react-icons/fc"

import useRegisterModal from "@/app/hooks/useRegisterModel"
import { useCallback, useState } from "react"
import {useForm, FieldValues, SubmitHandler} from "react-hook-form"
import Model from "./Model"
import Heading from "../Heading"
import Input from "../inputs/Input"
import { toast } from "react-hot-toast"
import Button from "../Button"
import { signIn } from "next-auth/react"
import useLoginModal from "@/app/hooks/useLoginModel"

const RegisterModel = () => {
    const loginModel = useLoginModal()
    const registerModel = useRegisterModal()
    const [isLoading, setIsLoading] = useState(false)
    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)
        axios.post("/api/register", data).then(()=>{
            registerModel.onClose();
        })
        .catch((error) => {
            toast.error("something went wrong")
        })
        .finally(()=>{
            setIsLoading(false)
        })
    }   

    const toggle = useCallback(()=>{
        registerModel.onClose()
        loginModel.onOpen()
    },[loginModel, registerModel])
    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title="Welcome to Airbnb" subtitle="Create an account!"  />
            <Input id="email" label="Email" disabled={isLoading}  register={register} required errors={errors}/>
            <Input id="name" label="Name" disabled={isLoading}  register={register} required errors={errors}/>
            <Input id="password" label="Password" type="password" disabled={isLoading}  register={register} required errors={errors}/>
        </div>
    )
    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button outline label="continue with Google" icon={FcGoogle} onClick={()=>signIn("google")}/>
            <Button outline label="continue with GitHub" icon={AiFillGithub} onClick={()=>signIn("github")}/>
            <div className="text-neutral-500 text-center mt-4 font-light">
                <div className="flex justify-center flex-row items-center gap-2">
                    <div>
                        already have an account?
                    </div>
                    <div className="text-neutral-800 cursor-pointer hover:underline" onClick={toggle}>
                        Log In
                    </div>
                </div>
            </div>
        </div>
    )
   return (
    <Model disabled={isLoading} isOpan={registerModel.isOpen} onClose={registerModel.onClose} title="register" actionLabel="Continue" onSubmit={handleSubmit(onSubmit)} body={bodyContent}  footer={footerContent}/>
  )
}

export default RegisterModel