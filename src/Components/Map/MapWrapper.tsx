
import 'ol/ol.css';
import {Wrapper} from './Map.styles'
import { createContext, useContext, useEffect, useRef, useState } from "react"
import { InputLabel,NativeSelect } from '@mui/material';
import createMap from './createMap';
import { MapContext } from '../../App';




const deleteMap = ()=>{
  const mapElement:any = document.getElementById('map')
  mapElement.removeChild(mapElement?.firstChild)
}
function MapWrapper(props) {
  const {mapCenter, drawings, addDrawing} = useContext(MapContext)
  const [x, y] = mapCenter ? mapCenter : []

  const selectedType = useRef("")


  useEffect(()=>{
    createMap({selectedType,addDrawing, center: mapCenter, drawings})
    return ()=>{
      deleteMap()
    }
  },[x, y])

  // render component
  return (   <>
  <Wrapper>
    <InputLabel htmlFor="type">Escolha uma forma para desenhar no mapa</InputLabel>
    <NativeSelect id="type">
      <option value="Circle">Circulo</option>
      <option value="Square">Quadrado</option>
      <option value="Box">Retangulo</option>
      <option value="Polygon">Forma Livre</option>
    </NativeSelect>
    <div id="map" className="map" />
</Wrapper>
  </>   
  ) 

}

export default MapWrapper