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
        <TextField name='CEP' label='CEP' mask={"99999-999"}/>
        <TextField name='name' label='Nome'/>
        <TextField name='CPF' label='CPF' mask={"999.999.999-99"}/>
        <TextField name='email' label='Email'/>
        <TextField name='message' label='Mensagem'/>
        <input type='submit'/>
      </FormikForm>
    </Formik>
  )
}

export default Form