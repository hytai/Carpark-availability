import { useState } from 'react'
import GoogleMapReact from 'google-map-react'
import LocationMarker from './LocationMarker'
import proj4 from 'proj4'
import LocationInfoBox from './LocationInfoBox'


const GMap = ({ data, centre, zoom }) => {
  proj4.defs([
    [
      'EPSG:4326',
      '+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees'],
    [
      'EPSG:24500',
      'PROJCS["Kertau 1968 / Singapore Grid", GEOGCS["Kertau 1968", DATUM["Kertau_1968", SPHEROID["Everest 1830 Modified",6377304.063,300.8017,AUTHORITY["EPSG","7018"]], TOWGS84[-11,851,5,0,0,0,0], AUTHORITY["EPSG","6245"]], PRIMEM["Greenwich",0, AUTHORITY["EPSG","8901"]], UNIT["degree",0.0174532925199433, AUTHORITY["EPSG","9122"]], AUTHORITY["EPSG","4245"]], PROJECTION["Cassini_Soldner"], PARAMETER["latitude_of_origin",1.287646666666667], PARAMETER["central_meridian",103.8530022222222], PARAMETER["false_easting",30000], PARAMETER["false_northing",30000], UNIT["metre",1, AUTHORITY["EPSG","9001"]], AXIS["Easting",EAST], AXIS["Northing",NORTH], AUTHORITY["EPSG","24500"]]'
    ]
  ]);

  const [locationInfo, setLocationInfo] = useState(null)

  const markers = data.map(carpark => {
    if (typeof carpark.coords !== 'undefined' && carpark.coords.length > 0) {
      var cLots = 'INFORMATION NOT AVAILABLE'
      var yLots = 'INFORMATION NOT AVAILABLE'
      var hLots = 'INFORMATION NOT AVAILABLE'
      var type = 'INFORMATION NOT AVAILABLE'
      var nightParking = 'INFORMATION NOT AVAILABLE'
      var systemType = 'INFORMATION NOT AVAILABLE'
      if (typeof carpark.lots !== 'undefined' && carpark.lots.length > 0) {
        carpark.lots.map(lot => {
          if (lot.lot_type === 'C') {
            cLots = lot.lots_available + '/' + lot.total_lots + ' AVAILABLE'
          } else if (lot.lot_type === 'Y') {
            yLots = lot.lots_available + '/' + lot.total_lots + ' AVAILABLE'
          } else if (lot.lot_type === 'H') {
            hLots = lot.lots_available + '/' + lot.total_lots + ' AVAILABLE'
          }
        })
      }
      if (typeof carpark.car_park_type !== 'undefined') {
        type = carpark.car_park_type
      }
      if (typeof carpark.night_parking !== 'undefined') {
        nightParking = carpark.night_parking
      }
      if (typeof carpark.type_of_parking_system !== 'undefined') {
        systemType = carpark.type_of_parking_system
      }
      return <LocationMarker lat = { carpark.coords[1] } lng = { carpark.coords[0] } onClick = {() => 
        setLocationInfo ({ address: carpark.address, 
          cLots: cLots,
          yLots: yLots,
          hLots: hLots,
          car_park_no: carpark.car_park_no,
          car_park_type: type,
          night_parking: nightParking,
          type_of_parking_system: systemType
        })} />
  }
  })

  return (
    <div className = "map">
      <GoogleMapReact
      bootstrapURLKeys = { { key: 'AIzaSyAy5kkoBH7cEvl627DIPSBOtgpgUfpNj2g'}}
      defaultCenter = { centre }
      defaultZoom = { zoom }
      >
        { markers }
      </GoogleMapReact>
      { locationInfo && <LocationInfoBox info = { locationInfo } /> }
    </div>
  )
}

GMap.defaultProps = {
  centre: {
    lat: 1.3521,
    lng: 103.8198
  },
  zoom: 12.2
}

export default GMap;
