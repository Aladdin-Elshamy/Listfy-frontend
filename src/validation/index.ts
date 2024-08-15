import * as yup from "yup"

export const registerSchema = yup
  .object({
    username: yup.string().required("Username is required").min(5,"Username should be at least 5 charachters"),
    email: yup.string().required("Email is required").matches(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, "Email is not valid"),
    password: yup.string().required("Password is required").min(6,"Password should be at least 6 charachters"),
  })
  .required()

export const loginSchema = yup
  .object({
    identifier: yup.string().required("Email is required").matches(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, "Email is not valid"),
    password: yup.string().required("Password is required").min(6,"Password should be at least 6 charachters"),
  })
  .required()

export function validateTodo(todo:{title:string}){
  const error = {
    title: "",
  }
  if(!todo.title?.trim() || todo.title?.length < 5){
    error.title = "Title should be at least 5 charachters"
  }
  return error
}