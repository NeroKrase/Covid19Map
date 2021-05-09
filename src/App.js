import './App.css';
import {useState, useEffect} from "react"
import Map from "./components/map/Map"
import Statistics from "./components/statistics/Statistics";
import Loader from "react-loader-spinner"
import axios from './axios'
import mapboxgl from "mapbox-gl"
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

export default function App() {

    const [data, setData] = useState({});

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get('summary');
            setData(request.data)
            console.log(request.data)
            return request
        }
        fetchData()
    }, [])

    if (Object.keys(data).length === 0) {
        return <Loader className="loader" type="BallTriangle" color="#00BFFF" height={100} width={100} timeout={3000}/>
    } else {
        return (
            <div>
                <Statistics global={data.Global}/>
                <div className="map-container">
                    <Map countries={data.Countries}/>
                </div>
            </div>
        )
    }
}
