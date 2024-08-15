import { ILoginForm, IRegisterForm } from "../interfaces";

export const REGISTER_FORM: IRegisterForm[] = [
    {
        name:"username",
        type:"text",
        placeholder:"Username",
        validation:{
            required:true,
            minLength:5
        }
    },
    {
        name:"email",
        type:"text",
        placeholder:"Email",
        validation:{
            required:true,
            pattern:/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/
        }
    },
    {
        name:"password",
        type:"password",
        placeholder:"Password",
        validation:{
            required:true,
            minLength:6
        }
    }
]
export const LOGIN_FORM: ILoginForm[] = [
    {
        name:"identifier",
        type:"text",
        placeholder:"Email",
        validation:{
            required:true,
            pattern:/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/
        }
    },
    {
        name:"password",
        type:"password",
        placeholder:"Password",
        validation:{
            required:true,
            minLength:6
        }
    }
]