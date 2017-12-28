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

	componentWillMount() {
		navigator.geolocation.getCurrentPosition(
			(position) => {
					appState.latitude = position.coords.latitude.toString();
					appState.longitude = position.coords.longitude.toString();
					modeStore.inputMode = 1;
					appState.handleSubmit()
			},
			(error) => {
				appState.handleSubmit();
			}
		);
	}

	render() {
		const checkUndefined = (value) => {
			return value == undefined ? '-' : value;
		}
		const getUnits = (metric) => {
			return metric ? 'C' : 'F'
		}
		return (
			<View style={styles.forecastsection}>
				<Text style={{color: '#fff'}}>Forecast</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	forecastsection: {
		flex: -2,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default Forecast;