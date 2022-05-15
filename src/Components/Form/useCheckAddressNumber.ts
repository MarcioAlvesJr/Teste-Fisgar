import { useFormikContext } from 'formik'
import React, { useContext, useEffect } from 'react'
import { useMutation } from 'react-query'

import fetchPlaceInfo from '../../HTTP/fetchPlaceInfo'
import { useAppDispatch } from '../../redux/hooks'
import setPinInMap from './setPinInMap'

const checkAddress = (data, setFieldError, dispatch)=>{
    const thereIsStreetNumber = data.results[0]
    .address_components.find(({types}) => types.includes("street_number"))
  
    if(thereIsStreetNumber) return setPinInMap(data, dispatch)
    setFieldError("address",  "Por favor inclua o número no endereço")
}
const useCheckAddressNumber = () => {
    const {errors, values, setFieldError} = useFormikContext<any>()
    const address = values?.address
    const {isLoading, data, mutate} = useMutation(fetchPlaceInfo)
    const dispatch = useAppDispatch()
    
    useEffect(()=>{
        if(address) mutate(address.place_id)
    },[address])
    useEffect(()=>{
        if(data)checkAddress(data, setFieldError, dispatch)
    },[isLoading, data, errors])
}

export default useCheckAddressNumber