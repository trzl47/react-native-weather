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
let unit = modeStore.metric ? 'metric' : 'imperial';

class appState {
	@observable mode = 0;
	@observable loading = false;
	@observable searchCity = DEFAULT_CITY;
	@observable countryCode = DEFAULT_COUNTRY;
	@observable zipcode = DEFAULT_ZIPCODE;
	@observable longitude = '0.0';
	@observable latitude = '0.0';
	@observable apikey = API_KEY;
	@observable days = [];
	@observable forecast = [];
	@observable weather = {};
	@observable location = {};

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

	handleSubmit = (e) => {
		console.log('submit button pressed');
		this.loading = true;
		console.log(`this.loading = ${this.loading}`);
		modeStore.forecast ? this.getForecast(unit) : this.getWeather(unit);
	}

	getWeather = (unit) => {
		console.log('getWeather() hit');
		const CITY_CURRENT_URL = `http://api.openweathermap.org/data/2.5/weather?q=${this.searchCity}&units=${unit}&appid=${this.apikey}`

		axios.get(CITY_CURRENT_URL)
		.then((response) => {
			if (response.status == 200) {
				this.weather = response.data;
				this.loading = false;
				console.log(this.weather);
				console.log(this.location);
			}
		})
		.catch(error => {
			console.log('Error fetching and parsing data by coordinates', error);
			this.loading = false;
	});
	}

	getForecast = (unit) => {
		console.log('getForecast() hit');
		const CITY_FORECAST_URL = `http://api.openweathermap.org/data/2.5/forecast?q=${this.searchCity},${this.countryCode}&units=${unit}&appid=${this.apikey}`;

		axios.get(CITY_FORECAST_URL)
		.then((response) => {
			if (response.status == 200) {
				this.forecast = response.data.list;
				this.loading = false;
				console.log(this.forecast);
				console.log(this.location);
			}
		})
		.catch(error => {
			console.log('Error fetching and parsing data by coordinates', error);
			this.loading = false;
	});
	}

	getIcon = (id) => {
		const ICON_URL = `http://openweathermap.org/img/w/${id}.png`;
	}

}

export default new appState();