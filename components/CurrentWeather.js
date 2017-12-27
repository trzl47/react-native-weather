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
			<View style={styles.currentsection}>
				<Text style={{color: '#fff'}}>Current Weather</Text>
				<View style={styles.weathersection}>
					<Text style={{color: '#fff'}}>
						{ checkUndefined(appState.main.temp).toString() }&deg;{ getUnits(modeStore.metric) }
					</Text>
					<Text style={{color: '#fff'}}>
						HI: { checkUndefined(appState.main.temp_max).toString() }&deg;{ getUnits(modeStore.metric) }
					</Text>
					<Text style={{color: '#fff'}}>
						LO: { checkUndefined(appState.main.temp).toString() }&deg;{ getUnits(modeStore.metric) }
					</Text>
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
	weathersection: {
		flex: -3,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default CurrentWeather;