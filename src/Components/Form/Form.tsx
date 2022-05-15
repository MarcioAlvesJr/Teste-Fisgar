import { Button } from '@mui/material'
import { Formik, Form as FormikForm, useFormikContext} from 'formik'
import { useContext, useEffect } from 'react'
import { useElementSize } from 'usehooks-ts'
import { StepperWrapperContext } from '../StepperWrapper/StepperWrapper'
import TextField from './connectedFields/TextField'
import { FieldsWrapper } from './Form.styles'
import formikConfig from './formikConfig/formikConfig'
import useConfirmForm from './formikConfig/useConfirmForm'
import AddressAutocomplete from './GoogleMaps'





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
          <AddressAutocomplete {...{width}}/>
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