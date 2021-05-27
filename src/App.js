import './App.css';
import { FormControl, Select, MenuItem, InputLabel, Card, CardContent } from '@material-ui/core';
import { useEffect, useState } from 'react';
import InfoBox from './InfoBox';
import Map from './Map';
import CasesTable from './Table';
import { sortData } from './util';
import LineGraph from './LineGraph';
import "leaflet/dist/leaflet.css";

function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("WW");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const  [mapCenter,setMapCenter]=useState({lat: 7.8731, lng: 80.7718});
  const [mapZoom,setMapZoom]=useState(5);
  const [mapCountries,setMapCountries]= useState([]);

  const fetchWorldWideInfo = ()=>{
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) =>{
        return response.json();
      }).then((data)=>{
        setCountryInfo(data);
      
      })
  }

  useEffect(() => {
    fetchData();
    fetchWorldWideInfo();
  }, []);

  const fetchData = () => {
    fetch("https://api.caw.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        var cty = data.map((country) => ({
          name: country.country,
          value: country.countryInfo.iso2,
        }))

        const sortedData= sortData(data);
        setTableData(sortedData);
        setCountries(cty);
        setMapCountries(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onChangeCountry = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);

    const url= countryCode === 'worldwide' ? 'https://api.caw.sh/v3/covid-19/countries' : `https://api.caw.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url).then(
      (response)=>{
        return response.json();
      }
    ).then(
      (data)=>{
        setCountry(countryCode);
        setCountryInfo(data);
        setMapCenter([data.countryInfo.lat,data.countryInfo.long])
        setMapZoom(4);
      }
    )

  }

  return (
    <div className="app">
      <div className="app_left">
        <h1>Covid 19 Tracker </h1>
        <div>
          <FormControl style={{ width: '300px' }}>
            <Select variant="outlined" value={country} id="cty" onChange={onChangeCountry} >
              <MenuItem defaultValue="" value="WW">World wide</MenuItem>
              {
                countries.map(
                  (country) => {
                    return <MenuItem value={country.value}>{country.name}</MenuItem>
                  }
                )
              }
            </Select>
          </FormControl>
        </div>

        <div className="app_stats">
          <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases} />

          <InfoBox title="Recovered" cases={countryInfo.todayRecovered}  total={countryInfo.recovered} />

          <InfoBox title="Death" cases={countryInfo.todayDeaths}  total={countryInfo.deaths} />
        </div>

        <div>
          <Map countries={mapCountries} center={mapCenter} zoom={mapZoom}/>
        </div>
      </div>

      <div className="app_right">
        <Card>
          <CardContent>
            <h3>Live Cases by Country</h3>
              <CasesTable countries={tableData}></CasesTable>
            <h3>WorldWide new Cases</h3>
            <LineGraph></LineGraph>
          </CardContent>
        </Card>
      </div>


    </div>
  );
}

export default App;


