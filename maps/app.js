let map;

const leaflet = ({ latitude, longitude }) => {
  map = L.map('map').setView([latitude, longitude], 13);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '🄯 OSM'
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
  const LISTINGS_CONTAINER = document.querySelector('#table > tbody');

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
    console.log(jsonRefuge);

    LISTINGS_CONTAINER.innerHTML = '';
    jsonRefuge.forEach(({ latitude, longitude, comment, updated_at, distance, name, street, city, state }) => {
      const fillOpacity = 1 / (distance || 1);
      const radius = 4 + fillOpacity;
      const address = `${street.trim()}, ${city.trim()}, ${state.trim()}`;

      const marker = L.circleMarker([latitude, longitude], { radius, color: 'white', fillColor: 'black', fillOpacity, weight: 1.5 }).addTo(map);
      marker.bindPopup(`
        <div class="map-popup">
          <p class="name">${name}</p>
          <p class="address">${address}</p>
          <p class="comment">${comment}</p>
          <p class="distance">${Math.round(distance * 1_000) / 1_000} miles away</p>
          <p class="timestamp">${new Date(updated_at).toLocaleString()}</p>
          <div class="go"><a href='maps://?address="${address}"&near="${latitude},${longitude}"&q="${name}"'>GO</a></div>
        </div>
      `);

      const listing = document.createElement('tr');
      listing.innerHTML = `
        <td>${name}</td>
        <td>${address}</td>
        <td>${Math.round(distance * 1_000) / 1_000} miles</td>
      `;
      LISTINGS_CONTAINER.appendChild(listing);

    });

    return { timestamp, coords };
  };

  navigator.geolocation.getCurrentPosition(successCallback);
};

main();
