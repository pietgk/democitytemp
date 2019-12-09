const axios = require('axios');
const { demoSecrets } = require('../lib/secrets');
// OpenWeatherMap try 1
// apiKey 76f704a8bd49cc78a36ab28d9aedac2c

// api.openweathermap.org/data/2.5/forecast?id=524901&APPID=76f704a8bd49cc78a36ab28d9aedac2c

// http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=76f704a8bd49cc78a36ab28d9aedac2c

// http://api.openweathermap.org/data/2.5/weather?q=sfax&APPID=76f704a8bd49cc78a36ab28d9aedac2c
// http://api.openweathermap.org/data/2.5/weather?q=covilha&APPID=76f704a8bd49cc78a36ab28d9aedac2c

// const londonDummy = {
//     "coord": { "lon": -0.13, "lat": 51.51 },
//     "weather": [{ "id": 800, "main": "Clear", "description": "clear sky", "icon": "01n" }],
//     "base": "stations",
//     "main": {
//         "temp": 277.81, "pressure": 1021, "humidity": 69, "temp_min": 275.93, "temp_max": 280.15
//     }, "visibility": 10000,
//     "wind": {
//         "speed": 1.5, "deg": 300
//     }, "clouds": {
//         "all": 0
//     },
//     "dt": 1575915613,
//     "sys": {
//         "type": 1, "id": 1502, "country": "GB", "sunrise": 1575878020, "sunset": 1575906721
//     }, "timezone": 0,
//     "id": 2643743,
//     "name": "London", "cod": 200
// }
// const data = { name: city, main: { temp: temperature } } = londonDummy;

exports.getCurrentTemperaturInCohilva = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            // const secrets = await demoSecrets;
            // const accuweatherApiKey = secrets['accuweather-apikey'];
            // const cohilvaLocationKey = '272687'; //const url = `${host}accuweather-locations-api/apis/get/locations/v1/cities/search?apikey=${accuweatherApiKey}&q=Covilha&language=en-us&details=false`;
            // const host = 'http://dataservice.accuweather.com';
            // const url = `${host}/currentconditions/v1/${cohilvaLocationKey}?apikey=y${accuweatherApiKey}`;

            const url = "http://api.openweathermap.org/data/2.5/weather?q=covilha&APPID=76f704a8bd49cc78a36ab28d9aedac2c";

            const responce = await axios.get(url);
            const { name: city, main: { temp: temperature } } = responce.data;
            const unit = "F";
            resolve({ city, temperature, unit });

            // const responce = await axios.get(url);
            // const { LocalObservationDateTime: observationTime, Temperature: { Metric: { Value: temperature, Unit: unit } } } = responce;
            // const city = "Covilha";
            // resolve({ city, temperature, unit, observationTime });
        } catch (e) {
            reject(e);
        }
        /* responce: {
            "LocalObservationDateTime": "2019-12-02T13:11:00+00:00",
            "EpochTime": 1575292260,
            "WeatherText": "Partly sunny",
            "WeatherIcon": 3,
            "HasPrecipitation": false,
            "PrecipitationType": null,
            "IsDayTime": true,
            "Temperature": {
            "Metric": {
                "Value": 8.5,
                "Unit": "C",
                "UnitType": 17
            },
            "Imperial": {
                "Value": 47,
                "Unit": "F",
                "UnitType": 18
            }
            },
            "MobileLink": "http://m.accuweather.com/en/pt/covilha/272687/current-weather/272687?lang=en-us",
            "Link": "http://www.accuweather.com/en/pt/covilha/272687/current-weather/272687?lang=en-us"
        }*/
    });
};

/* example accuweather-locations-api result for cohilva
{
    "Version": 1,
    "Key": "272687",
    "Type": "City",
    "Rank": 62,
    "LocalizedName": "Covilha",
    "EnglishName": "Covilha",
    "PrimaryPostalCode": "",
    "Region": {
      "ID": "EUR",
      "LocalizedName": "Europe",
      "EnglishName": "Europe"
    },
    "Country": {
      "ID": "PT",
      "LocalizedName": "Portugal",
      "EnglishName": "Portugal"
    },
    "AdministrativeArea": {
      "ID": "05",
      "LocalizedName": "Castelo Branco",
      "EnglishName": "Castelo Branco",
      "Level": 1,
      "LocalizedType": "District",
      "EnglishType": "District",
      "CountryID": "PT"
    },
    "TimeZone": {
      "Code": "WET",
      "Name": "Europe/Lisbon",
      "GmtOffset": 0,
      "IsDaylightSaving": false,
      "NextOffsetChange": "2020-03-29T01:00:00Z"
    },
    "GeoPosition": {
      "Latitude": 40.283,
      "Longitude": -7.503,
      "Elevation": {
        "Metric": {
          "Value": 736,
          "Unit": "m",
          "UnitType": 5
        },
        "Imperial": {
          "Value": 2414,
          "Unit": "ft",
          "UnitType": 0
        }
      }
    },
    "IsAlias": false,
    "SupplementalAdminAreas": [
      {
        "Level": 2,
        "LocalizedName": "Covilha",
        "EnglishName": "Covilha"
      }
    ],
    "DataSets": [
      "AirQualityCurrentConditions",
      "AirQualityForecasts",
      "Alerts",
      "MinuteCast",
      "Radar"
    ]
  }


*/