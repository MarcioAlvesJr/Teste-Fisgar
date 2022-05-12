import { Formik, Form as FormikForm} from 'formik'
import React from 'react'
import TextField from './connectedFields/TextField'
import formikConfig from './formikConfig/formikConfig'



const Form = () => {
  return (
    <Formik {...formikConfig}>
      <FormikForm>
        <TextField name='city' label='Cidade'/>
        <TextField name='state' label='Estado'/>
        <TextField name='street' label='Rua'/>
        <TextField name='district' label='Bairro'/>
        <TextField name='CEP' label='CEP'/>
        <TextField name='name' label='Nome'/>
        <TextField name='CPF' label='CPF'/>
        <TextField name='email' label='Email'/>
        <TextField name='message' label='Mensagem'/>
        <input type='submit'/>
      </FormikForm>
    </Formik>
  )
}

export default Form