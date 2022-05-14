import Draw, {
    createBox,
    createRegularPolygon,
  } from 'ol/interaction/Draw';
  import Map from 'ol/Map';
  import Polygon from 'ol/geom/Polygon';
  import View from 'ol/View';
  import {OSM, Stamen, TileJSON, Vector as VectorSource} from 'ol/source';
  import {Tile as TileLayer, Vector, Vector as VectorLayer} from 'ol/layer';
  import {Style, Icon} from 'ol/style'
  import { Feature, Overlay } from "ol";
  import { Point } from "ol/geom";

const defaultCenter = [-5547493.764825, -1671096.767749]

const createMap = ({selectedType, addDrawing, center, drawings})=>{
    const raster = new TileLayer({
      source: new OSM(),
    });
    
    const source = new VectorSource({wrapX: false});

    if(center){
      source.addFeature(new Feature({
      geometry: new Point(center)
  }))}
    
    drawings.current.map(drawing=>source.addFeature(drawing.feature))
  
    source.on('addfeature', function(evt){
      
      const feature : any = evt.feature
      console.log(feature, feature.getGeometry(), feature.getGeometryName(), feature.constructor)
      const geometry = feature.getGeometry()
      const type = selectedType.current
  
      let newDrawing = {
        type: type,
        cordinates: geometry.getCoordinates(),
        feature
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
        center: center ? center : defaultCenter,
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

  export default createMap