import { Backdrop, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, List, ListItem, ListItemText } from '@mui/material'
import { Formik, Form as FormikForm, useFormikContext} from 'formik'
import { useContext, useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { useElementSize } from 'usehooks-ts'
import fetchPlaceInfo from '../../HTTP/fetchPlaceInfo'
import { StepperWrapperContext } from '../StepperWrapper/StepperWrapper'
import TextField from './connectedFields/TextField'
import { FieldsWrapper } from './Form.styles'
import formikConfig from './formikConfig/formikConfig'
import { FormValues } from './formikConfig/initialValues'
import useConfirmForm from './formikConfig/useConfirmForm'
import AdressAutocomplete from './GoogleMaps'





const ConfigStepper = ()=>{
  const {submitForm} = useFormikContext()
  const {setActionsBtns} = useContext(StepperWrapperContext)
  
  useEffect(()=>{
    setActionsBtns(
      <Button  onClick={submitForm} >Enviar</Button>
    )

  },[submitForm, setActionsBtns])

  return <></>
}
const Form = () => {
  const {Modal, onSubmit} = useConfirmForm()
  const [fieldsWrappeRef, { width }] = useElementSize()

  return (
    <>
    <Formik {...formikConfig} {...{onSubmit}} >
      <FormikForm>
        <FieldsWrapper ref={fieldsWrappeRef} >
          <AdressAutocomplete {...{width}}/>
          <TextField name='name' label='Nome'/>
          <TextField name='CPF' label='CPF' mask={"999.999.999-99"}/>
          <TextField name='email' label='Email'/>
          <TextField name='message' label='Mensagem' multiline/>
          <ConfigStepper/>
        </FieldsWrapper>
      </FormikForm>
    </Formik>
    <Modal/>
    </>
  )
}

export default Form