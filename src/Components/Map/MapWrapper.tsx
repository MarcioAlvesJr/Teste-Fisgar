
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

  const selectedType = useRef("")


  useEffect(()=>{
    createMap({selectedType,addDrawing, center: mapCenter, drawings})
    return ()=>{
      deleteMap()
    }
  },[mapCenter])

  // render component
  return (   <>
  <Wrapper>
    <div id="map" className="map" />
    <InputLabel htmlFor="type">Desenhar</InputLabel>
    <NativeSelect id="type">
      <option value="Circle">Circulo</option>
      <option value="Square">Quadrado</option>
      <option value="Box">Retangulo</option>
      <option value="Polygon">Poligono</option>
    </NativeSelect>
</Wrapper>
  </>   
  ) 

}

export default MapWrapper