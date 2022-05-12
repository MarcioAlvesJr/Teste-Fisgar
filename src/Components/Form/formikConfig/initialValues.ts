import React from 'react'

export interface FormValues {
    city: string,
    state: string,
    street: string,
    district: string,
    CEP: string,
    name: string,
    CPF: string,
    email: string,
    message: string,
    cordenates: string,
    bulletPoint: string
}
const initialValues : FormValues = {
    city: "",
    state: "",
    street: "",
    district: "",
    CEP: "",
    name: "",
    CPF: "",
    email: "",
    message: "",
    cordenates: "",
    bulletPoint: "" 
}

export default initialValues