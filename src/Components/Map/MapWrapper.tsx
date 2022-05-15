
import 'ol/ol.css';
import {Wrapper} from './Map.styles'
import { createContext, useContext, useEffect, useRef, useState } from "react"
import { InputLabel,NativeSelect } from '@mui/material';
import createMap from './createMap';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';




const deleteMap = ()=>{
  const mapElement:any = document.getElementById('map')
  mapElement.removeChild(mapElement?.firstChild)
}
function MapWrapper(props) {
  const {center, drawings} = useAppSelector(state=>state.map)
  const dispatch = useAppDispatch()
  const [x, y] = center ? center : []

  const selectedType = useRef("")


  useEffect(()=>{
    createMap({selectedType, dispatch , center, drawings})
    return ()=>{
      deleteMap()
    }
  },[x, y])

  // render component
  return (   <>
  <Wrapper>
    <InputLabel htmlFor="type">Escolha uma forma para desenhar no mapa</InputLabel>
    <NativeSelect id="type">
      <option value="Circle">Círculo </option>
      <option value="Square">Quadrado</option>
      <option value="Box">Retângulo</option>
      <option value="Polygon">Forma Livre</option>
    </NativeSelect>
    <div id="map" className="map" />
</Wrapper>
  </>   
  ) 

}

export default MapWrapper