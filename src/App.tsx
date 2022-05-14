import { createContext, useRef, useState } from "react";
import Form from "./Components/Form/Form";
import Map from "./Components/Map/MapWrapper";
import StepperWrapper from "./Components/StepperWrapper/StepperWrapper";


const useMapState = ()=>{
  const [mapCenter, setMapCenter] = useState()
  const drawings = useRef<any>([])
  const addDrawing = (newDrawing)=>{
    drawings.current = [...drawings.current, newDrawing]
    console.log(drawings.current)
  }


  return {mapCenter, setMapCenter,drawings, addDrawing}

}
export const MapContext = createContext({} as any)

function App() {
  const mapState = useMapState()
  return (
    <div className="App">
      <StepperWrapper>
        <MapContext.Provider value={mapState}>
          <Form/>
          <Map/>
        </MapContext.Provider>
      </StepperWrapper>
    </div>
  );
}

export default App;
