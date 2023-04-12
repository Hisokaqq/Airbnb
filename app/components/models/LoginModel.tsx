"use client"
import axios from "axios"
import { AiFillGithub } from "react-icons/ai"
import {FcGoogle} from "react-icons/fc"

import useLoginModal from "@/app/hooks/useLoginModel"
import { useCallback, useState } from "react"
import {useForm, FieldValues, SubmitHandler} from "react-hook-form"
import Model from "./Model"
import Heading from "../Heading"
import Input from "../inputs/Input"
import { toast } from "react-hot-toast"
import Button from "../Button"
import {signIn} from "next-auth/react"
import { useRouter } from "next/navigation"
import useRegisterModal from "@/app/hooks/useRegisterModel"
const LoginModel = () => {
    const loginModel = useLoginModal()
    const registerModel = useRegisterModal()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)
        signIn("credentials", {
            ...data,
            redirect: false,
        })
        .then((callback)=>{
            setIsLoading(false)
            if(callback?.ok){
                toast.success("Logged In")
                router.refresh
                loginModel.onClose()
            }

            if(callback?.error){
                toast.error(callback.error)
            }
        })
    }   

    const toggle = useCallback(()=>{
        loginModel.onClose()
        registerModel.onOpen()
    },[loginModel, registerModel])
    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title="Welcome back" subtitle="Login to your account!"  />
            <Input id="email" label="Email" disabled={isLoading}  register={register} required errors={errors}/>
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
                        First time using Airbnb?
                    </div>
                    <div className="text-neutral-800 cursor-pointer hover:underline" onClick={toggle}>
                        Create an accunt
                    </div>
                </div>
            </div>
        </div>
    )
   return (
    <Model disabled={isLoading} isOpan={loginModel.isOpen} onClose={loginModel.onClose} title="Login" actionLabel="Continue" onSubmit={handleSubmit(onSubmit)} body={bodyContent}  footer={footerContent}/>
  )
}

export default LoginModel