import { Backdrop, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, List, ListItem, ListItemText } from '@mui/material'
import { Formik, Form as FormikForm, useFormikContext} from 'formik'
import { useContext, useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import fetchPlaceInfo from '../../HTTP/fetchPlaceInfo'
import { StepperWrapperContext } from '../StepperWrapper/StepperWrapper'
import TextField from './connectedFields/TextField'
import { FieldsWrapper } from './Form.styles'
import formikConfig from './formikConfig/formikConfig'
import { FormValues } from './formikConfig/initialValues'
import AdressAutocomplete from './GoogleMaps'


const useAlert = ()=>{
  const [alert, setAlert] = useState([]);


  const handleClose = () => {
    setAlert([]);
  };

  const Alert = ()=>
  <Dialog open={alert?.length !== 0}onClose={handleClose}>
    <DialogTitle id="alert-dialog-title">{alert[0]}</DialogTitle>
    <DialogContent>
      <DialogContentText>{alert[1]}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} autoFocus>Ok</Button>
    </DialogActions>
  </Dialog>

  return {Alert, setAlert}
}
const checkAdress = (data, setAlert, setOpenModal)=>{
  const thereIsStreetNumber = data.results[0]
  .address_components.find(({types}) => types.includes("street_number"))

  if(thereIsStreetNumber) return setOpenModal(true)
  return setAlert(["Endereço Incompleto", "Por favor inclua o número no endereço"])
}
const useConfirmForm = ()=>{
  const [openModal, setOpenModal] = useState(false)
  const {Alert, setAlert} = useAlert()

  const [values, setValues] = useState<FormValues>()
  const handleClose = ()=> setOpenModal(false)
  const adressInfoMutate = useMutation(fetchPlaceInfo,{onSuccess:(data)=>checkAdress(data, setAlert, setOpenModal)})

  const onSubmit = (values, actions)=>{
    adressInfoMutate.mutate(values.address.place_id)
    setValues(values)
  }
  const Modal = ()=>{

    return <>
    <Alert/>
    {adressInfoMutate.data && 
          <Dialog open={openModal} onClose={handleClose}>
        <DialogTitle>
          {"Suas informações estão corretas?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <List>
              <ListItem><ListItemText primary="Endereço" secondary={<>
                {adressInfoMutate.data && adressInfoMutate.data.results[0].formatted_address}
              </>}/></ListItem>
              <ListItem><ListItemText primary="Nome" secondary={values?.name}/></ListItem>
              <ListItem><ListItemText primary="CPF" secondary={values?.CPF}/></ListItem>
              <ListItem><ListItemText primary="Email" secondary={values?.email}/></ListItem>
              <ListItem><ListItemText primary="Mensagem" secondary={values?.message}/></ListItem>
            </List>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Não</Button>
          <Button  onClick={handleClose} autoFocus disabled={adressInfoMutate.isLoading}>Sim</Button>
        </DialogActions>
      </Dialog>}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={adressInfoMutate.isLoading}>
          <CircularProgress color="inherit" />
      </Backdrop>
    
    </>
  }

  return {Modal, onSubmit}
}

const ConfigStepper = ()=>{
  const {submitForm} = useFormikContext()
  const {setActionsBtns, setTitle} = useContext(StepperWrapperContext)
  
  useEffect(()=>{
    setTitle("Formulario")
    setActionsBtns(
      <Button  onClick={submitForm} >Continuar</Button>
    )

  },[submitForm, setActionsBtns])

  return <></>
}
const Form = () => {
  const {Modal, onSubmit} = useConfirmForm()
  return (
    <>
    <Formik {...formikConfig} {...{onSubmit}} >
      <FormikForm>
        <FieldsWrapper>
          <AdressAutocomplete/>
          <TextField name='name' label='Nome'/>
          <TextField name='CPF' label='CPF' mask={"999.999.999-99"}/>
          <TextField name='email' label='Email'/>
          <TextField name='message' label='Mensagem'/>
          <ConfigStepper/>
        </FieldsWrapper>
      </FormikForm>
    </Formik>
    <Modal/>
    </>
  )
}

export default Form