import { useState, useEffect } from 'react';
import GMap from './Components/GMap'
import Loader from './Components/Loader'
import Header from './Components/Header';
import proj4 from 'proj4'

function App() {

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])

  proj4.defs([
    [
      'EPSG:4326',
      '+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees'],
    [
      'EPSG:24500',
      'PROJCS["Kertau 1968 / Singapore Grid", GEOGCS["Kertau 1968", DATUM["Kertau_1968", SPHEROID["Everest 1830 Modified",6377304.063,300.8017,AUTHORITY["EPSG","7018"]], TOWGS84[-11,851,5,0,0,0,0], AUTHORITY["EPSG","6245"]], PRIMEM["Greenwich",0, AUTHORITY["EPSG","8901"]], UNIT["degree",0.0174532925199433, AUTHORITY["EPSG","9122"]], AUTHORITY["EPSG","4245"]], PROJECTION["Cassini_Soldner"], PARAMETER["latitude_of_origin",1.287646666666667], PARAMETER["central_meridian",103.8530022222222], PARAMETER["false_easting",30000], PARAMETER["false_northing",30000], UNIT["metre",1, AUTHORITY["EPSG","9001"]], AXIS["Easting",EAST], AXIS["Northing",NORTH], AUTHORITY["EPSG","24500"]]'
    ]
  ]);

  useEffect (() => {
    setLoading(true)
    Promise.all([
      fetch('https://data.gov.sg/api/action/datastore_search?resource_id=139a3035-e624-4f56-b63f-89ae28d4ae4c&limit=3000'),
      fetch('https://api.data.gov.sg/v1/transport/carpark-availability')
    ]).then(function (responses) {
      return Promise.all(responses.map(function (response) {
        return response.json();
      }));
    }).then(function (data) {
      let carparkArray = data[0].result.records
      let lotArray = data[1].items[0].carpark_data
      var hmap = new Map()
      for (let k = 0; k < lotArray.length; k ++) {
        hmap.set(lotArray[k].carpark_number, lotArray[k].carpark_info)
      }
      var json = {
        carpark: []
      }
      for (let i = 0; i < carparkArray.length; i ++) {
        var latLng = proj4('EPSG:24500', 'EPSG:4326', [Number(carparkArray[i].x_coord), Number(carparkArray[i].y_coord)])
        json.carpark.push({
          "address" : carparkArray[i].address,
          "car_park_no" : carparkArray[i].car_park_no,
          "coords" : latLng,
          "lots" : hmap.get(carparkArray[i].car_park_no),
          "car_park_type" : carparkArray[i].car_park_type,
          "night_parking" : carparkArray[i].night_parking,
          "type_of_parking_system" : carparkArray[i].type_of_parking_system
        })
      }
      setData(json.carpark)
    }).then(function () {
      setLoading(false)
    }).catch(function (error) {
      // if there's an error, log it
      console.log(error);
    })
  }, [])

  return (
    <div>
      <Header />
      { ! loading ? <GMap data = { data } /> : <Loader /> } 
    </div>
  );

};


export default App;