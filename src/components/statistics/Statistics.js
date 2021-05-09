import "./Statistics.css"

const Statistics = (props) => {
    return(
        <div>
            <h1 className="title">Covid19 state</h1>
            <h2 className="subtitle">Date: {props.global.Date.split("T")[0]}</h2>
            <div className="labels-group">
                <p className="confirmed">New confirmed: <span className="number">{props.global.NewConfirmed}</span></p>
                <p className="deaths">New deaths: <span className="number">{props.global.NewDeaths}</span></p>
                <p className="recovered">New recovered: <span className="number">{props.global.NewRecovered}</span></p>
            </div>
            <div className="labels-group">
                <p className="confirmed">Total confirmed: <span className="number">{props.global.TotalConfirmed}</span></p>
                <p className="deaths">Total deaths: <span className="number">{props.global.TotalDeaths}</span></p>
                <p className="recovered">Total recovered: <span className="number">{props.global.TotalRecovered}</span></p>
            </div>
        </div>
    )
}

export default Statistics
