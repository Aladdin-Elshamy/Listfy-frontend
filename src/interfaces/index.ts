import { TAllowedLoginNames, TAllowedRegisterNames } from "../types"

export interface IRegisterForm {
    name: TAllowedRegisterNames,
    type:string,
    placeholder: string,
    validation:{
        required:boolean,
        minLength?:number,
        pattern?:RegExp
    }
}
export interface ILoginForm {
    name: TAllowedLoginNames,
    type:string,
    placeholder: string,
    validation:{
        required:boolean,
        minLength?:number,
        pattern?:RegExp
    }
}

export interface IErrorMessage{
    error:{
        message?:string
    }
}


export interface ITodo {
    id?: undefined | string
    title: string
    description: string
}