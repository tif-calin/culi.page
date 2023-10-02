/**
 * @type Array<{
 *  category: string;
 *  comment?: string;
 *  label: string;
 *  params?: { [key: string]: string | number };
 *  sublabel?: string;
 *  url: string;
 * }>;
 */
const SERVICES = [
  // need: transportation
  {
    category: 'vehicle', label: 'GasBuddy', sublabel: 'gas price heatmap', url: 'https://www.gasbuddy.com/gaspricemap',
    params: { lat: '%LAT%', lng: '%LNG%', z: 7 }
  },
  { category: 'vehicle', label: 'free air pumps', url: 'https://www.freeairpump.com/map/' },
  // need: toilet
  {
    category: 'restrooms', label: 'REFUGE', sublabel: 'restrooms', url: 'https://www.refugerestrooms.org/restrooms',
    params: { urf8: '%E2%9C%93', lat: '%LAT%', long: '%LNG%' }
  },
  // need: local info
  { category: 'indigeneity', label: 'Native Lands', url: 'https://native-land.ca/' },
  {
    category: 'nature', label: 'iNaturalist', sublabel: 'species observations',
    url: 'https://www.inaturalist.org/observations',
    params: { lat: '%LAT%', lng: '%LNG%', place_id: 'any', radius: 7, view: 'species' }
  },
  { category: 'nature', label: 'OneEarth', sublabel: 'bioregions', url: 'https://www.oneearth.org/navigator/' },
  {
    category: 'demographics', label: 'NYTimes 2020 election', sublabel: 'precinct map',
    url: 'https://www.nytimes.com/interactive/2021/upshot/2020-election-map.html'
  },
  {
    category: 'demographics', label: 'NYTimes 2016 election', sublabel: 'precinct map',
    url: 'https://www.nytimes.com/interactive/2018/upshot/election-2016-voting-precinct-maps.html#10.95/%LAT%/%LNG%/4069'
  },
  { category: 'grocery', label: 'co-op grocery stores map', url: 'https://grocerystory.coop/food-co-op-directory' },
  {
    category: 'food', label: 'LocalHarvest',
    sublabel: 'local food: farms, farmer\'s markets, grocery stores, restaurants, etc',
    url: 'https://www.localharvest.org/search.jsp?jmp&scale=8&lat=%LAT%&lon=%LNG%',
    params: { scale: 8, lat: '%LAT%', lon: '%LNG%' }
  },
  { category: 'shops & rec', label: 'FindMeCoffee', sublabel: 'coffee', url: 'https://www.findmecoffee.com/' },
  { category: 'drugs', label: 'weed legality by state', url: 'https://disa.com/marijuana-legality-by-state' },
  // need: sleep
  { category: 'boondocking', label: 'boondockerswelcome.com', url: 'https://www.boondockerswelcome.com/', comment: 'boondocking, $80/year for stays, $180/year to also stay at wineries, farms, breweries, etc' },
  { category: 'boondocking', label: 'boondocking.org', url: 'https://boondocking.org/', comment: 'boondocking, community-submitted tips' },
  { category: 'boondocking', label: 'campendium.com', url: 'https://www.campendium.com/', comment: 'camping, parks, hosting, for-profit' },
  { category: 'boondocking', label: 'freeroam.app', url: 'https://freeroam.app/', comment: 'nature-loving free campers, 501c3' },
  { category: 'boondocking', label: 'freecampsites.net', url: 'https://freecampsites.net/', comment: 'free campsites, community-submitted tips' },
  { category: 'boondocking', label: 'harvesthosts.com', url: 'https://harvesthosts.com/', comment: 'rv camping membership' },
  { category: 'boondocking', label: 'kift.com', url: 'https://www.kift.com/', comment: 'very bougie/expensive hipster, van life membership and blockchain thing' },
  { category: 'boondocking', label: 'landcamp.org', url: 'https://www.landcamp.org/', comment: 'hosting, 3 stays free $100/year otherwise, CA only' },
  { category: 'boondocking', label: 'warmshowers.org', url: 'https://www.warmshowers.org/', comment: 'bicycle tourists' },
  { category: 'boondocking', label: 'couchsurfing.com', url: 'https://www.couchsurfing.com/', comment: 'couchsurfing, social network' },
  { category: 'boondocking', label: 'vanly.app', url: 'https://vanly.app/', comment: 'airbnb for driveways basically, very expensive' },
  { category: 'boondocking', label: 'boondockersbible.com', url: 'https://www.boondockersbible.com/list-of-places-for-boondocking/', comment: 'a small map of boondocking sites' },
  // need: weather
  { category: 'weather', label: 'Windy', sublabel: 'rain map', url: 'https://www.windy.com/-Rain-thunder-rain?rain,%LAT%,%LNG%,9,i:pressure' },
];

/**
 * @param {string} baseUrl
 * @param {Record<string, string | number> | undefined} params
 * @param {{ latitude: number; longitude: number; }} inputs
 */
const makeUrlWithSearchParams = (baseUrl, params, { latitude, longitude }) => {
  let searchParams = '';
  if (params && Object.values(params || {}).length) {
    const paramStrings = Object.entries(params).map(([key, value]) => `${key}=${value}`);
    searchParams = paramStrings.join('&');
  }

  return `${baseUrl}?${searchParams}`.replace('%LAT%', latitude.toString()).replace('%LNG%', longitude.toString());
};

/**
 * @type Array<{ label?: string; id: string; }>
 */
const CATEGORIES = [
  { id: 'shop', label: 'Shops & Groceries' },
  { id: 'nature', label: 'Nature' },
];
