import './app/tabs.js';

// Containers
const OTHER_MAPS_CONTAINER = document.querySelector('#other > ul');
const TABLE_CONTAINER = document.querySelector('#other > ul');

// Data
let MAP;
const TILES = {
  positron: { url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png' },
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
  { label: 'GasBuddy gas price heatmap', url: 'https://www.gasbuddy.com/gaspricemap?lat=%LAT%&lng=%LNG%&z=8' },
  { label: 'REFUGE restrooms', url: 'https://www.refugerestrooms.org/restrooms?utf8=%E2%9C%93&lat=%LAT%&long=%LNG%' },
  { label: 'iNaturalist species observations', url: 'https://www.inaturalist.org/observations?lat=%LAT%&lng=%LNG%&place_id=any&radius=7&view=species' },
  { label: 'NYTimes 2020 election vote precinct map', url: 'https://www.nytimes.com/interactive/2021/upshot/2020-election-map.html' },
  { label: 'NYTimes 2016 election vote precinct map', url: 'https://www.nytimes.com/interactive/2018/upshot/election-2016-voting-precinct-maps.html#10.95/%LAT%/%LNG%/4069' },
  { label: 'co-op grocery stores map', url: 'https://grocerystory.coop/food-co-op-directory' },
  { label: 'free air pumps', url: 'https://www.freeairpump.com/map/' },
  { label: 'coffeeshops', url: 'https://www.findmecoffee.com/en/listings/1?latitude=%LAT%&&longitude=%LNG%&pagesize=50' },
  { label: 'weed legality by state', url: 'https://disa.com/marijuana-legality-by-state' },
  { label: 'boondocking', list: [
    { label: 'boondockerswelcome.com', url: 'https://www.boondockerswelcome.com/', comment: 'boondocking, $80/year for stays, $180/year to also stay at wineries, farms, breweries, etc' },
    { label: 'boondocking.org', url: 'https://boondocking.org/', comment: 'boondocking, community-submitted tips' },
    { label: 'campendium.com', url: 'https://www.campendium.com/', comment: 'camping, parks, hosting, for-profit' },
    { label: 'freeroam.app', url: 'https://freeroam.app/', comment: 'nature-loving free campers, 501c3' },
    { label: 'freecampsites.net', url: 'https://freecampsites.net/', comment: 'free campsites, community-submitted tips' },
    { label: 'harvesthosts.com', url: 'https://harvesthosts.com/', comment: 'rv camping membership' },
    { label: 'kift.com', url: 'https://www.kift.com/', comment: 'very bougie/expensive hipster, van life membership and blockchain thing' },
    { label: 'landcamp.org', url: 'https://www.landcamp.org/', comment: 'hosting, 3 stays free $100/year otherwise, CA only' },
    { label: 'warmshowers.org', url: 'https://www.warmshowers.org/', comment: 'bicycle tourists' },
    { label: 'couchsurfing.com', url: 'https://www.couchsurfing.com/', comment: 'couchsurfing, social network' },
    { label: 'vanly.app', url: 'https://vanly.app/', comment: 'airbnb for driveways basically, very expensive' },
    { label: 'boondockersbible.com', url: 'https://www.boondockersbible.com/list-of-places-for-boondocking/', comment: 'a small map of boondocking sites' },
    { label: 'allstays.com', url: 'https://www.allstays.com/', comment: 'ugly UI free to browse, pay to get no ads, Walamrt parking info, truck stops, dump sites, etc' },
    { label: 'ioverlander.com', url: 'https://www.ioverlander.com/', comment: 'nonprofit, aggregator of many different overlays incl. campsites, wifi, showers, etc' },
    { label: 'sekr.com', url: 'https://sekr.com/', comment: 'van life social network and maps' },
  ] },
  { label: 'OneEarth bioregions', url: 'https://www.oneearth.org/navigator/' },
  { label: 'LocalHarvest', url: 'https://www.localharvest.org/search.jsp?jmp&scale=8&lat=%LAT%&lon=%LNG%' }
];

// Logic
console.table(OTHER_MAPS);

const leaflet = ({ latitude, longitude }) => {
  MAP = L.map('map').setView([latitude, longitude], 13);
  L.tileLayer(TILES.positron.url, TILES.positron.options).addTo(MAP);
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

  if (!TABLE_CONTAINER) return;

  TABLE_CONTAINER.innerHTML = '';
  OTHER_MAPS.forEach(link => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    li.appendChild(span);

    const urls = link.list || [link];

    urls.forEach(({ label, url }, i) => {
      const comment = link.comment;

      const a = document.createElement('a');

      a.href = url.replace('%LAT%', lat).replace('%LNG%', lng);
      a.target = '_blank';
      a.innerText = label;
      if (comment) a.title = comment;

      span.appendChild(a);
      if (i < urls.length - 1) span.appendChild(document.createTextNode(' | '))
    });

    TABLE_CONTAINER.appendChild(li);
  });
};

const main = async () => {
  const RESTROOMS_TABLE = document.querySelector('#table');
  const LISTINGS_CONTAINER = RESTROOMS_TABLE?.querySelector('#table > tbody');
  const OTHER_MAPS_CONTAINER = document.querySelector('#other > ul');

  populateOtherMaps();

  const successCallback = async (position) => {
    RESTROOMS_TABLE?.classList.add('reserve-height');
    const { timestamp, coords } = position;

    const latitude = coords.latitude;
    const longitude = coords.longitude;
    const speed = coords.speed;
    const heading = coords.heading;
    const accuracy = coords.accuracy;
    const altitude = coords.altitude;
    const altitudeAccuracy = coords.altitudeAccuracy;

    const data = { latitude, longitude, speed, heading, accuracy, altitude, altitudeAccuracy };

    populateOtherMaps(latitude, longitude);

    const map = leaflet(data);
    const jsonRefuge = await refuge(data);
    console.log(jsonRefuge);

    if (LISTINGS_CONTAINER) LISTINGS_CONTAINER.innerHTML = '';
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
        <td id=${id}>${icons} ${label}</td>
        <td>${address}</td>
        <td>${Math.round(distance * 100) / 100}m</td>
      `;

      LISTINGS_CONTAINER?.appendChild(listing);
    });


    RESTROOMS_TABLE?.classList.remove('reserve-height');
    return { timestamp, coords };
  };

  navigator.geolocation.getCurrentPosition(successCallback);
};

main();
