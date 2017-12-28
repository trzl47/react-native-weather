// Libs
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import axios from 'axios';
// stores
import modeStore from '../mobx/modeStore.js';

const DEFAULT_ZIPCODE = '64133';
const DEFAULT_CITY = 'Kansas City';
const DEFAULT_COUNTRY = 'US';
const API_KEY = '31d62ddacc48d72645a6c0e14680d1b6';
const queryModeEval = () => {
	return modeStore.forecast ? 'forecast' : 'weather';
}

const unitModeEval = () => {
	return modeStore.metric ? 'metric' : 'imperial';
}

class appState {
	@observable mode = 0;
	@observable loading = false;
	@observable searchCity = DEFAULT_CITY;
	@observable cityID = '0';
	@observable countryCode = DEFAULT_COUNTRY;
	@observable zipcode = DEFAULT_ZIPCODE;
	@observable longitude = '0.0';
	@observable latitude = '0.0';
	@observable apikey = API_KEY;
	@observable days = [];
	@observable forecast = [];
	@observable main = {};
	@observable weather = [];

	updateSearchCity = (text) => {
		this.searchCity = text;
		console.log(`searchCity = ${this.searchCity}`);
	}

	updateCountryCode = (text) => {
		this.countryCode = text;
		console.log(`countryCode = ${this.countryCode}`);
	}

	updateZipCode = (text) => {
		this.zipcode = text;
		console.log(`zipcode = ${this.zipcode}`);
	}

	updateLongitude = (text) => {
		this.longitude = text;
		console.log(`longitude = ${this.longitude}`);
	}

	updateLatitude = (text) => {
		this.latitude = text;
		console.log(`latitude = ${this.latitude}`);
	}

	getIcon = (id) => {
		const ICON_URL = `http://openweathermap.org/img/w/${id}.png`;
	}

	handleSubmit = () => {
		this.loading = true;
		modeStore.forecast ? this.getForecast() : this.getWeather();
	}

	// used to get postal codes globally; OWM is limited to US
	geonamesAPI = (lat,lon) => {
		const url = `http://api.geonames.org/findNearbyPostalCodesJSON?lat=${lat}&lng=${lon}&username=trzl47`

		axios.get(url)
		.then((response) => {
			this.zipcode = response.data.postalCodes[0].postalCode;
		})
		.catch(error => {
			console.log('Error fetching geonamesAPI', error);
			return 'geonames error';
		});
	}

	urlChange = (querymode) => {
		if(modeStore.inputMode == 0 ) {
			return url = `http://api.openweathermap.org/data/2.5/${querymode}?q=${this.searchCity}&units=${unitModeEval()}&appid=${this.apikey}`;
		}
		else if(modeStore.inputMode == 1 ) {
			return url = `http://api.openweathermap.org/data/2.5/${querymode}?lat=${this.latitude}&lon=${this.longitude}&units=${unitModeEval()}&appid=${this.apikey}`;;
		}
		else if(modeStore.inputMode == 2 ) {
			return url = `http://api.openweathermap.org/data/2.5/${querymode}?zip=${this.zipcode},${this.countryCode}&units=${unitModeEval()}&appid=${this.apikey}`;;
		}
		else if(modeStore.inputMode == 3 ) {
			return url = `http://api.openweathermap.org/data/2.5/${querymode}?id=${this.cityID}&units=${unitModeEval()}&appid=${this.apikey}`;
		}
	};
	getWeather = () => {
		console.log('getWeather() hit');

		axios.get(this.urlChange(queryModeEval()))
		.then((response) => {
			if (response.status == 200) {
				this.main = response.data.main;
				this.weather = response.data.weather;
				this.searchCity = response.data.name;
				this.countryCode = response.data.sys.country;
				this.latitude = response.data.coord.lat.toString();
				this.longitude = response.data.coord.lon.toString();
				this.geonamesAPI(response.data.coord.lat, response.data.coord.lon);
				this.loading = false;
			}
		})
		.catch(error => {
			console.log('Error fetching and parsing data by coordinates', error);
			this.loading = false;
		});
	}

	getForecast = () => {
		console.log('getForecast() hit');

		axios.get(this.urlChange(queryModeEval()))
		.then((response) => {
			if (response.status == 200) {
				console.log(response.data.cnt);
				this.loading = false;
			}
		})
		.catch(error => {
			console.log('Error fetching and parsing data by coordinates', error);
			this.loading = false;
	});
	}
}

export default new appState();