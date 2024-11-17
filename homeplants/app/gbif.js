
const URL = 'https://api.gbif.org/v1/occurrence/search';
const DEFAULT_PARAMS = {
  limit: 299
};

const gadmToName = {};

const parseData = (results, { taxonKey }) => results
  .filter(obs =>
    Number(obs.acceptedTaxonKey) === Number(taxonKey) &&
    obs.occurrenceStatus === 'PRESENT'
  )
  .map(obs => {
    const gadm = Object.entries(obs.gadm).sort((a, b) => a[0].toString().localeCompare(b[0]));

    return {
      id: obs.key,
      date: obs.eventDate,
      lat: obs.decimalLatitude,
      long: obs.decimalLongitude,
      source: obs.references,
      gadmIds: gadm.map(([_level, { gid, name }]) => {
        gadmToName[gid] = name;
        return gid
      }),
    };
  })
;

export const getObservations = async ({
  limit = DEFAULT_PARAMS.limit,
  taxonKey,
}) => {
  const url = `${URL}?${new URLSearchParams(
    { limit, taxonKey }
  )}`

  const response = await fetch(url);
  const data = await response.json();

  return { data: parseData(data.results, { taxonKey }), gadmToName };
};
