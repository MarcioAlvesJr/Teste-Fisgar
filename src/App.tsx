import Form from "./Components/Form/Form";
import Map from "./Components/Map/MapWrapper";
import StepperWrapper from "./Components/StepperWrapper/StepperWrapper";

function App() {
  return (
    <div className="App">
      <StepperWrapper>
        <Form/>
        {/* <Map/> */}
      </StepperWrapper>
    </div>
  );
}

export default App;
