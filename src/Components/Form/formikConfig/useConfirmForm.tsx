import React, { useContext, useState } from 'react'
import { Backdrop, Badge, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, List, ListItem, ListItemIcon, ListItemText, Chip, ListItemButton, Collapse  } from '@mui/material'

import { useMutation } from 'react-query'
import fetchPlaceInfo from '../../../HTTP/fetchPlaceInfo'
import { FormValues } from './initialValues'
import InboxIcon from '@mui/icons-material/Inbox';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import EmailIcon from '@mui/icons-material/Email';
import MessageIcon from '@mui/icons-material/Message';
import FormatShapesIcon from '@mui/icons-material/FormatShapes';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import SquareOutlinedIcon from '@mui/icons-material/SquareOutlined';
import RectangleOutlinedIcon from '@mui/icons-material/RectangleOutlined';
import PolylineOutlinedIcon from '@mui/icons-material/PolylineOutlined';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useAppSelector } from '../../../redux/hooks'
import InfoIcon from '@mui/icons-material/Info';
const figures = {
  Circle : {text: "Círculo", icon: <CircleOutlinedIcon/>} ,
  Square :{text: "Quadrado", icon: <SquareOutlinedIcon/>} ,
  Box: {text: "Retângulo", icon: <RectangleOutlinedIcon/>},
  Polygon :{text: "Polígono", icon: <PolylineOutlinedIcon/>} ,
}
const CustomListItemText = (props)=>{
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  const {type, cordinates}= props

  const formatDistance = distanceInMeters => {
    if (distanceInMeters >= 1000) {
      return Math.round(distanceInMeters / 1000.0) + " km"
    } else if (distanceInMeters >= 100) {
      return Math.round(distanceInMeters) + " m"
    } else {
      return distanceInMeters.toFixed(1) + " m"
    }
  };
  const cordinateFormat = (array) =>{
    const [x, y] = array

    return `X: ${x}, Y: ${y}`
  } 

  const cordinateChips = type === "Circle"? 
  [
    <Chip size="small" label={`Centro: ${cordinateFormat(cordinates.center)}`} />,
    <Chip size="small" label={`Raio: ${formatDistance(cordinates.radius)}`} />
  ]
  :cordinates.map((cordinate, idx)=>(
    <Chip key={idx} size="small" label={`Ponto ${idx+1}: ${cordinateFormat(cordinate)}`} />
  ))

  return<>
  <ListItemButton sx={{ pl: 4 }} onClick={handleClick}>
    <ListItemIcon>
      {type === 'Polygon' && <Badge badgeContent={cordinates.length} color="secondary">{figures[type].icon}</Badge>}
      {type !== 'Polygon' && figures[type].icon}
    </ListItemIcon>
    <ListItemText  primary={figures[type].text} />
    {open ? <ExpandLess /> : <ExpandMore />}
  </ListItemButton>
  <Collapse in={!open} timeout="auto" unmountOnExit>
    <List component="div" disablePadding>
      {cordinateChips.map((chip,idx)=>
      <ListItem key={idx} sx={{ pl: 8 }}>
        {chip}
      </ListItem>)}
    </List>
  </Collapse>
  </> 
}

const useAlert = ()=>{
    const [alert, setAlert] = useState([]);
  
  
    const handleClose = () => {
      setAlert([]);
    };
  
    const Alert = ()=>{
        return <>
        <Dialog open={alert?.length !== 0} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">{alert[0]}</DialogTitle>
        <DialogContent>
          <DialogContentText>{alert[1]}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>Ok</Button>
        </DialogActions>
      </Dialog>
        </>
    }
  
    return {Alert, setAlert}
}
  
const checkAddress = (data, setAlert, setOpenModal)=>{
    const thereIsStreetNumber = data.results[0]
    .address_components.find(({types}) => types.includes("street_number"))
    if(thereIsStreetNumber) return setOpenModal(true)
    return setAlert(["Endereço Incompleto", "Por favor inclua o número no endereço"])
  }

const typesToString = types =>{
  if(types.includes("street_number")) return "Número"
  if(types.includes("route")) return "Rua"
  if(types.includes("sublocality_level_1")) return "Bairro"
  if(types.includes("administrative_area_level_2")) return "Cidade"
  if(types.includes("administrative_area_level_1")) return "Estado"
  if(types.includes("country")) return "País"
  if(types.includes("postal_code")) return "CEP"
  return types.join(" - ")
}

const AddressList = ({addressInfoMutate})=>{
  const [openAddress, setOpenAddress] = useState(false)
  const handleClick = () => {
    setOpenAddress(prev=>!prev);
  };

  return<>
                  <ListItemButton onClick={handleClick}>
                  <ListItemIcon><HomeIcon /></ListItemIcon>
                  <ListItemText primary="Endereço" secondary={addressInfoMutate.data.results[0].formatted_address}/>
                  {openAddress ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openAddress} timeout="auto" unmountOnExit>

                
                <List component="div" disablePadding>
                  {addressInfoMutate.data.results[0].address_components.map((address_component, idx)=>{
                    return(
                    <ListItem sx={{ pl: 4 }} key={idx}>
                      <ListItemIcon><InfoIcon /></ListItemIcon>
                      <ListItemText primary={typesToString(address_component.types)} secondary={address_component.long_name}></ListItemText>
                    </ListItem>)
                  })}
                </List>
                </Collapse>
  </>
}
const useConfirmForm = ()=>{
    const [openModal, setOpenModal] = useState(false)
    const {Alert, setAlert} = useAlert()
    const [values, setValues] = useState<FormValues>()
    const handleClose = ()=> setOpenModal(false)
    const addressInfoMutate = useMutation(fetchPlaceInfo,{onSuccess:(data)=>checkAddress(data, setAlert, setOpenModal)})
    const {drawings} = useAppSelector(state=>state.map)

    const onSubmit = (values, actions)=>{
      addressInfoMutate.mutate(values.address.place_id)
      setValues(values)
    }

    const Modal = ()=>{
  
      return <>
      <Alert/>
      {addressInfoMutate.data && 
            <Dialog open={openModal} onClose={handleClose}>
          <DialogTitle>
            Informaçoes a serem enviadas
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <List>
                <AddressList {...{addressInfoMutate}}/>
                <ListItem>
                  <ListItemIcon><PersonIcon /></ListItemIcon>
                  <ListItemText primary="Nome" secondary={values?.name}/>
                </ListItem>
                <ListItem>
                  <ListItemIcon><AssignmentIndIcon /></ListItemIcon>
                  <ListItemText primary="CPF" secondary={values?.CPF}/>
                </ListItem>
                <ListItem>
                  <ListItemIcon><EmailIcon /></ListItemIcon>
                  <ListItemText primary="Email" secondary={values?.email}/>
                </ListItem>
                <ListItem>
                  <ListItemIcon><MessageIcon /></ListItemIcon>
                  <ListItemText primary="Mensagem" secondary={values?.message}/>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Badge badgeContent={drawings.length} color="primary">
                      <FormatShapesIcon />
                    </Badge>
                  </ListItemIcon>
                  <ListItemText primary={drawings.length === 0 ? "Nenhuma Figura Desenhada" : "Figuras Desenhadas"} secondary={drawings.length === 0 ? "": "Cordenadas em EPSG:3857 WGS 84 / Pseudo-Mercator"} />
                </ListItem>
              </List>
              <List component="div" disablePadding>
                  {drawings.map((drawing, idx)=>(
                    <CustomListItemText  key={idx} {...drawing} />
                    ))}
              </List>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button  onClick={handleClose} autoFocus disabled={addressInfoMutate.isLoading}>Ok</Button>
          </DialogActions>
        </Dialog>}
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={addressInfoMutate.isLoading}>
            <CircularProgress color="inherit" />
        </Backdrop>
      
      </>
    }
  
    return {Modal, onSubmit}
  }

export default useConfirmForm