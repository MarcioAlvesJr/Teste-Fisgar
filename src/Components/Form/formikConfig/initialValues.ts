import React from 'react'
import { PlaceType } from '../GoogleMaps'

export interface FormValues {
    address: null | PlaceType,
    name: string,
    CPF: string,
    email: string,
    message: string,
    adressType: string
}
const initialValues : FormValues = {
    adressType: "",
    address: null,
    name: "",
    CPF: "",
    email: "",
    message: "",
}

export default initialValues