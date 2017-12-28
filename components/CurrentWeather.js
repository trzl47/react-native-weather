// Libs
import React, { Component } from 'react';
import { observer } from 'mobx-react';

// components
import { FlatList, StyleSheet, View, Text } from 'react-native';
import Weather from './Weather.js';

// stores
import modeStore from '../mobx/modeStore.js';
import appState from '../mobx/appState.js';

@observer
class CurrentWeather extends Component {
	componentDidMount() {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				modeStore.forecast = false;
				modeStore.inputMode = 1;
				appState.latitude = position.coords.latitude.toString();
				appState.longitude = position.coords.longitude.toString();
				appState.handleSubmit();
			},
			(error) => {
				console.log('<Currentweather /> componentWillMount() error');
			}
		);
	}

	componentDidUpdate() {
		modeStore.inputMode = 0;
	}

	render() {
		const checkUndefined = (value) => {
			return value == undefined ? '-' : value;
		}

		const formTempArr = (temp,max,min) => {
			return [checkUndefined(temp),checkUndefined(max),checkUndefined(min)];
		}

		return (
			<View style={styles.currentsection}>
				<Text style={{color: '#fff'}}>Current Weather</Text>
				<View style={styles.currentrow}>
					<Text style={{color: '#fff'}}>Current Weather Row</Text>
					<Weather
						tempArr={formTempArr(appState.main.temp,appState.main.temp_max,appState.main.temp_min)}
					/>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	currentsection: {
		flex: -2,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
	currentrow: {
		flex: -3,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default CurrentWeather;