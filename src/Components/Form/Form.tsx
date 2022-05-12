import { Button } from '@mui/material'
import { Formik, Form as FormikForm} from 'formik'
import React from 'react'
import TextField from './connectedFields/TextField'
import { FieldsWrapper } from './Form.styles'
import formikConfig from './formikConfig/formikConfig'
import AdressAutocomplete from './GoogleMaps'




const Form = () => {
  return (
    <Formik {...formikConfig}>
      <FormikForm>
        <FieldsWrapper>
          <AdressAutocomplete/>
          <TextField name='CEP' label='CEP' mask={"99999-999"}/>
          <TextField name='name' label='Nome'/>
          <TextField name='CPF' label='CPF' mask={"999.999.999-99"}/>
          <TextField name='email' label='Email'/>
          <TextField name='message' label='Mensagem'/>
          <Button type='submit'>Enviar</Button>
        </FieldsWrapper>
      </FormikForm>
    </Formik>
  )
}

export default Form