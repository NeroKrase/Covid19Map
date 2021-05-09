import * as countriesData from "../../data/countries.json";
import ReactMapGL, {Marker, Popup} from "react-map-gl";
import {useEffect, useState} from "react";

const Map = (props) => {
    function getCases(code) {
        let currentCountry = props.countries.filter(c => c.CountryCode === code)
        if (currentCountry.length > 0) {
            let size = Math.ceil(currentCountry[0].NewConfirmed / 3000)
            return {size: size < 5 ? 5 : size, newExist: size !== 0}
        } else {
            return {size: 0, newExist: false}
        }
    }

    function getCountry(code) {
        let currentCountry = props.countries.filter(c => c.CountryCode === code)[0]
        Object.assign(currentCountry, countriesData.ref_country_codes.filter(c => c.alpha2 === code)[0])
        return currentCountry
    }

    const [selectedCountry, setSelectedCountry] = useState(null)
    const [viewport, setViewport] = useState({
        latitude: 0.0000,
        longitude: 0.0000,
        width: "100%",
        height: 600,
        zoom: 1.6
    })

    useEffect(() => {
        const listener = e => {
            if (e.key === "Escape") {
                setSelectedCountry(null)
            }
        }
        window.addEventListener("keydown", listener)

        return () => {
            window.removeEventListener("keydown", listener)
        };
    }, [])

    return (
        <ReactMapGL
            {...viewport}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            onViewportChange={(viewport) => setViewport(viewport)}
            mapStyle={"mapbox://styles/nerokrase/ckmrok8dn29rr18p1ii9l8olk"}
            className="map"
        >
            {countriesData.ref_country_codes.map(c => (
                <Marker longitude={c.longitude > -180 && c.longitude < 180 ? c.longitude : 0}
                        latitude={c.latitude > -90 && c.latitude < 180 ? c.latitude : 0}
                        key={c.alpha2}
                >
                    <button
                        className="marker"
                        style={{
                            width: getCases(c.alpha2).size,
                            height: getCases(c.alpha2).size,
                            backgroundColor: getCases(c.alpha2).newExist ? "red" : "green"
                        }}
                        onClick={e => {
                            e.preventDefault()
                            setSelectedCountry(getCountry(c.alpha2))
                        }}
                    />
                </Marker>
            ))}
            {selectedCountry ? (
                <Popup className="popup"
                       onClose={() => setSelectedCountry(null)}
                       longitude={selectedCountry.longitude}
                       latitude={selectedCountry.latitude}
                >
                    <h4>{selectedCountry.Country}</h4>
                    <p>Today confirmed: {selectedCountry.NewConfirmed}</p>
                    <p>Today deaths: {selectedCountry.NewDeaths}</p>
                    <p>Today recovered: {selectedCountry.NewRecovered}</p>
                    <p>Total confirmed: {selectedCountry.TotalConfirmed}</p>
                    <p>Total deaths: {selectedCountry.TotalDeaths}</p>
                    <p>Total recovered: {selectedCountry.TotalRecovered}</p>
                </Popup>
            ) : null}
        </ReactMapGL>
    )
}

export default Map
