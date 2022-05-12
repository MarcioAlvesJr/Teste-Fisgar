import React from 'react'
import { PlaceType } from '../GoogleMaps'

export interface FormValues {
    address: null | PlaceType,
    CEP: string,
    name: string,
    CPF: string,
    email: string,
    message: string,
    cordenates: string,
    bulletPoint: string,
    adressType: string
}
const initialValues : FormValues = {
    adressType: "",
    address: null,
    CEP: "",
    name: "",
    CPF: "",
    email: "",
    message: "",
    cordenates: "",
    bulletPoint: "" 
}

export default initialValues