import React, { useState } from 'react';

const LocationInfoBox = ({ info }) => {
    const [expand, setExpand] = useState(false);

    const extraContent =
        <div>
            <ul className="extra-content">
                <li> TYPE: <strong> {info.car_park_type} </strong> </li>
                <li> NIGHT PARKING: <strong> {info.night_parking} </strong> </li>
                <li> PARKING SYSTEM TYPE: <strong> {info.type_of_parking_system} </strong> </li>
            </ul>
        </div>

    return (
        <div className="location-info">
            <h2><strong> {info.address} ({info.car_park_no}) </strong> </h2>
            <ul>
                <li> CAR LOTS: <strong> {info.cLots} </strong> </li>
                <li> MOTORCYCLE LOTS: <strong> {info.yLots} </strong> </li>
                <li> HEAVY VEHICLE LOTS: <strong> {info.hLots} </strong> </li>
            </ul>
            <button className="button" onClick={() => { setExpand(!expand) }}>
                + </button>
            {expand && extraContent}
        </div>
    )
}
export default LocationInfoBox