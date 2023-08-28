let map;

const leaflet = ({ latitude, longitude }) => {
  map = L.map('map').setView([latitude, longitude], 13);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: 'OSM'
  }).addTo(map);

  L.marker([latitude, longitude]).addTo(map);
};

const refuge = async ({ latitude, longitude }) => {
  const url = `https://www.refugerestrooms.org/api/v1/restrooms/by_location?lat=${latitude}&lng=${longitude}&per_page=24`;

  const resp = await fetch(url);
  const data = await resp.json();

  return data;
};

const main = async () => {
  const successCallback = async (position) => {
    const { timestamp, coords } = position;

    const latitude = coords.latitude;
    const longitude = coords.longitude;
    const speed = coords.speed;
    const heading = coords.heading;
    const accuracy = coords.accuracy;
    const altitude = coords.altitude;
    const altitudeAccuracy = coords.altitudeAccuracy;

    const data = { latitude, longitude, speed, heading, accuracy, altitude, altitudeAccuracy };

    leaflet(data);
    const jsonRefuge = await refuge(data);
    console.log(jsonRefuge)
    jsonRefuge.forEach(({ latitude, longitude }) => {
      L.marker([latitude, longitude]).addTo(map);
    })

    return { timestamp, coords };
  };

  navigator.geolocation.getCurrentPosition(successCallback);
};

main();
