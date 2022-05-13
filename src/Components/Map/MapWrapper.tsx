
import 'ol/ol.css';
import Draw, {
  createBox,
  createRegularPolygon,
} from 'ol/interaction/Draw';
import Map from 'ol/Map';
import Polygon from 'ol/geom/Polygon';
import View from 'ol/View';
import {OSM, Vector as VectorSource} from 'ol/source';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {Wrapper} from './Map.styles'
import { useEffect, useRef } from "react"
import { InputLabel, MenuItem, NativeSelect, Select } from '@mui/material';


const createMap = ({selectedType, addDrawing})=>{
  const raster = new TileLayer({
    source: new OSM(),
  });
  
  const source = new VectorSource({wrapX: false});

  source.on('addfeature', function(evt){
    const feature : any = evt.feature
    const geometry = feature.getGeometry()
    const type = selectedType.current

    let newDrawing = {
      type: type,
      cordinates: geometry.getCoordinates()
    }
    if(type === 'Circle'){
      newDrawing = {
        ...newDrawing,
        cordinates: {
          center: geometry.getCenter(),
          radius: geometry.getRadius()
        }
      }
    }
    addDrawing(newDrawing)
});
  
  const vector = new VectorLayer({
    source: source,
  });
  
  const map = new Map({
    layers: [raster, vector],
    target: 'map',
    view: new View({
      center: [-4922463.40, -2290915.24],
      zoom: 4,
    }),
  });
  
  const typeSelect :any = document.getElementById('type');
  
  let draw; // global so we can remove it later
  function addInteraction() {
    let value = typeSelect.value;
    selectedType.current = value
    if (value !== 'None') {
      let geometryFunction;
      if (value === 'Square') {
        value = 'Circle';
        geometryFunction = createRegularPolygon(4);
      } else if (value === 'Box') {
        value = 'Circle';
        geometryFunction = createBox();
      } else if (value === 'Star') {
        value = 'Circle';
        geometryFunction = function (coordinates, geometry) {
          const center = coordinates[0];
          const last = coordinates[coordinates.length - 1];
          const dx = center[0] - last[0];
          const dy = center[1] - last[1];
          const radius = Math.sqrt(dx * dx + dy * dy);
          const rotation = Math.atan2(dy, dx);
          const newCoordinates:any = [];
          const numPoints = 12;
          for (let i = 0; i < numPoints; ++i) {
            const angle = rotation + (i * 2 * Math.PI) / numPoints;
            const fraction = i % 2 === 0 ? 1 : 0.5;
            const offsetX = radius * fraction * Math.cos(angle);
            const offsetY = radius * fraction * Math.sin(angle);
            newCoordinates.push([center[0] + offsetX, center[1] + offsetY]);
          }
          newCoordinates.push(newCoordinates[0].slice());
          if (!geometry) {
            geometry = new Polygon([newCoordinates]);
          } else {
            geometry.setCoordinates([newCoordinates]);
          }
          return geometry;
        };
      } 
      
      draw = new Draw({
        source: source,
        type: value,
        geometryFunction: geometryFunction,
      });

      
      map.addInteraction(draw);
    }
  }
  
  /**
   * Handle change event.
   */
  typeSelect.onchange = function () {
    map.removeInteraction(draw);
    addInteraction();
  };
  
  addInteraction();
}
const deleteMap = ()=>{
  const mapElement:any = document.getElementById('map')
  mapElement.removeChild(mapElement?.firstChild)
}
function MapWrapper(props) {
  const selectedType = useRef("")
  const drawings = useRef<any>([])
  const addDrawing = (newDrawing)=>{
    drawings.current = [...drawings.current, newDrawing]
    console.log(drawings.current)
  }

  useEffect(()=>{
    createMap({selectedType,addDrawing})
    return ()=>{
      deleteMap()
    }
  },[])

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