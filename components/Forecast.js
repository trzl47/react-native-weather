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
class Forecast extends Component {

	componentDidMount() {

		navigator.geolocation.getCurrentPosition(
			(position) => {
				modeStore.inputMode = 1;
				appState.latitude = position.coords.latitude.toString();
				appState.longitude = position.coords.longitude.toString();
				appState.handleSubmit();
			},
			(error) => {
				console.log('<Forecast /> componentWillMount() error');
			}
		);
	}

	componentDidUpdate() {
		modeStore.inputMode = 0;
	}

	render() {
		const checkArrayLength = (element) => {
			const tempArr = appState.forecastArr.length < 1 ? ['-','-','-'] : [appState.forecastArr[element].main.temp, appState.forecastArr[element].main.temp_max, appState.forecastArr[element].main.temp_min] ;
			return tempArr;
		}

		return (
			<View style={styles.forecastsection}>
				<Text style={{color: '#fff'}}>Forecast</Text>
				<View style={styles.forecastrow}>
					<Text style={{color: '#fff'}}>Forecast Row</Text>
					<Weather tempArr={checkArrayLength(0)} />
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	forecastsection: {
		flex: -2,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
	forecastrow: {
		flex: -3,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default Forecast;