const getSolarNoonData = async (lat, lng) => {
  const URL = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&formatted=0`;
  return await fetch(URL)
    .then(res => res.json())
    .then(json => json.results)
    .catch(err => console.log(err))
  ;
};

const solarNoon = async (options, lat = 33.685, lng = -117.827) => {
  const opts = {
    ...options
  }

  // make the parent dom element
  const parent = document.createElement('div');

  // get data
  const data = await getSolarNoonData(lat, lng);

  // useful maths
  const now = new Date();
  const solarNoon = new Date(data.solar_noon);
  solarNoon.setDate(now.getDate());
  solarNoon.setMonth(now.getMonth());
  const sunrise = new Date(data.sunrise);
  const sunset = new Date(data.sunset);
  const sunrise_hours = sunrise.getHours() + (sunrise.getMinutes() / 60);
  const sunset_hours = sunset.getHours() + (sunset.getMinutes() / 60);

  // make span and findmylocation button
  const spnRelativeTime = document.createElement('span');
  const btnLocation = document.createElement('button');
  btnLocation.textContent = '📍';
  spnRelativeTime.textContent = `
    it is 
    ${Math.round((now - solarNoon) / 360000 ) / 10} hours 
    ${(now - solarNoon) > 0 ? 'after' : 'until'} solar noon 
    (${solarNoon.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toLowerCase()})
  `;
  //spnRelativeTime.appendChild(btnLocation);

  // make the visual
  const visual = document.createElement('div');
  visual.classList.add('solar-noon-visual');
  for (let i = 0; i < 3; i++) visual.appendChild(document.createElement('div'));
  const children = visual.children;

  visual.style.gridTemplateColumns = `
    ${sunrise_hours}fr 
    ${sunset_hours - sunrise_hours}fr 
    ${24 - sunset_hours}fr
  `;
  children[0].title = `the sun awakes at ${sunrise.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toLowerCase()}`;
  children[1].title = `today is ${Math.round(data.day_length / 360) / 10} hours long`;
  children[1].appendChild(document.createElement('div', {
    style: { backgroundColor: 'red' },
    width: '50%'
  }));
  children[2].title = `the sun sleeps at ${sunset.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toLowerCase()}`

  // append to parent
  parent.append(spnRelativeTime, visual);

  return parent;
};

export default solarNoon;
