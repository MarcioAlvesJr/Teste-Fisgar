import { Feature } from "ol";
import { Point } from "ol/geom";
import { fromLonLat } from "ol/proj"

const setPinInMap = (data,setMapCenter) => {
    const {lat, lng} =  data.results[0].geometry.location

    const position = fromLonLat([lng, lat])

    setMapCenter(position)
    

}

export default setPinInMap