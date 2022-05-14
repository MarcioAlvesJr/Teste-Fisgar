import axios from 'axios'

const fetchPlaceInfo = async (place_id) => {

    const res = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?place_id=${place_id}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`)

    return res.data
}

export default fetchPlaceInfo