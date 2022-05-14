import { useFormikContext } from 'formik'
import React, { useContext, useEffect } from 'react'
import { useMutation } from 'react-query'
import { MapContext } from '../../App'

import fetchPlaceInfo from '../../HTTP/fetchPlaceInfo'
import setPinInMap from './setPinInMap'

const checkAdress = (data, setFieldError, setMapCenter)=>{
    const thereIsStreetNumber = data.results[0]
    .address_components.find(({types}) => types.includes("street_number"))
  
    if(thereIsStreetNumber) return setPinInMap(data, setMapCenter)
    setFieldError("address",  "Por favor inclua o número no endereço")
}
const useCheckAdressNumber = () => {
    const {setMapCenter} = useContext(MapContext)
    const {errors, values, setFieldError} = useFormikContext<any>()
    const address = values?.address
    const {isLoading, data, mutate} = useMutation(fetchPlaceInfo)
    
    useEffect(()=>{
        if(address) mutate(address.place_id)
    },[address])
    useEffect(()=>{
        if(data)checkAdress(data, setFieldError, setMapCenter)
    },[isLoading, data, errors])
}

export default useCheckAdressNumber