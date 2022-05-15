import { Feature } from "ol";
import { Point } from "ol/geom";
import { fromLonLat } from "ol/proj"
import { mapActions } from "../../redux/features/map/mapSlice";

const setPinInMap = (data,dispatch) => {
    const {lat, lng} =  data.results[0].geometry.location

    const position = fromLonLat([lng, lat])

    dispatch(mapActions.defineCenter(position))
    

}

export default setPinInMap