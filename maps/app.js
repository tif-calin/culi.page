// Containers
const OTHER_MAPS_CONTAINER = document.querySelector('#other > ul');
const TABLE_CONTAINER = document.querySelector('#other > ul');

// Data
let MAP;
const TILES = {
  stadiaOutdoors: {
    url: 'https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.{ext}',
    options: {
      minZoom: 0,
      maxZoom: 20,
      attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      ext: 'png'
    }
  },
};
const OTHER_MAPS = [
  { label: 'GasBuddy gas price heatmap', url: 'https://www.gasbuddy.com/gaspricemap?lat=%LAT%&lng=%LNG%&z=7' },
  { label: 'iNaturalist species observations', url: 'https://www.inaturalist.org/observations?lat=%LAT%&lng=%LNG%&radius=7&subview=species' },
  { label: 'NYTimes 2020 election vote precinct map', url: 'https://www.nytimes.com/interactive/2021/upshot/2020-election-map.html' },
  { label: 'NYTimes 2016 election vote precinct map', url: 'https://www.nytimes.com/interactive/2018/upshot/election-2016-voting-precinct-maps.html#10.95/%LAT%/%LNG%/4069' },
  { label: 'co-op grocery stores map', url: 'https://grocerystory.coop/food-co-op-directory' },
  { label: 'free air pumps', url: 'https://www.freeairpump.com/map/' }
];

// Logic
console.table(OTHER_MAPS);

const leaflet = ({ latitude, longitude }) => {
  MAP = L.map('map').setView([latitude, longitude], 13);
  L.tileLayer(TILES.stadiaOutdoors.url, TILES.stadiaOutdoors.options).addTo(MAP);
  L.marker([latitude, longitude]).addTo(MAP);

  return MAP;
};

const refuge = async ({ latitude, longitude }) => {
  const url = `https://www.refugerestrooms.org/api/v1/restrooms/by_location?lat=${latitude}&lng=${longitude}&per_page=24`;

  const resp = await fetch(url);
  const data = await resp.json();

  return data;
};

const populateOtherMaps = (lat = '', lng = '') => {
  const TABLE_CONTAINER = document.querySelector('#other > ul');

  TABLE_CONTAINER.innerHTML = '';
  OTHER_MAPS.forEach(({ label, url }) => {
    const li = document.createElement('li');
    const a = document.createElement('a');

    a.href = url.replace('%LAT%', lat).replace('%LNG%', lng);
    a.target = '_blank';
    a.innerText = label;

    li.appendChild(a);
    TABLE_CONTAINER.appendChild(li);
  });
};

const main = async () => {
  const LISTINGS_CONTAINER = document.querySelector('#table > tbody');
  const OTHER_MAPS_CONTAINER = document.querySelector('#other > ul');

  populateOtherMaps();

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

    const map = leaflet(data);
    const jsonRefuge = await refuge(data);
    console.log(jsonRefuge);

    populateOtherMaps(latitude, longitude);

    LISTINGS_CONTAINER.innerHTML = '';
    jsonRefuge.forEach(({
      id, latitude, longitude,
      comment, updated_at, distance, name,
      street, city, state,
      accessible, changing_table, unisex
    }) => {
      const label = name.trim();
      const fillOpacity = 1 / (distance || 1);
      const radius = 4 + fillOpacity;
      const address = `${street.trim()}, ${city.trim()}, ${state.trim()}`;
      const mapUrl = encodeURI(`maps://?address="${address}"&near="${latitude},${longitude}"&q="${label}"`)
      const refugeUrl = `https://www.refugerestrooms.org/restrooms/${id}`;
      const icons = [
        accessible && '<span title="accessible">♿</span>',
        unisex && '<span title="gender neutral">🚻<span>',
        changing_table && '<span title="changing room">🚼</span>',
      ].filter(Boolean).join(' ');

      const marker = L.circleMarker([latitude, longitude], { radius, color: 'white', fillColor: 'black', fillOpacity, weight: 1.5 }).addTo(map);
      marker.bindPopup(`
        <div class="map-popup">
          <p class="name"><a href="#${id}">#</a>${label} ${icons}<span class="distance"> ${Math.round(distance * 100) / 100} miles away</span></p>
          <p class="address"><a href=${mapUrl}>${address}</a></p>
          <p class="comment">${comment}</p>
          <p class="timestamp">${new Date(updated_at).toLocaleString()}</p>
          <div class="action"><a href=${refugeUrl}>REFUGE</a></div>
        </div>
      `);

      const listing = document.createElement('tr');
      listing.innerHTML = `
        <td id=${id}>${label}</td>
        <td>${address}</td>
        <td>${Math.round(distance * 100) / 100}m</td>
      `;

      LISTINGS_CONTAINER.appendChild(listing);
    });

    return { timestamp, coords };
  };

  navigator.geolocation.getCurrentPosition(successCallback);
};

main();
