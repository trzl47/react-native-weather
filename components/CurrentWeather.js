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

		const getUnits = (metric) => {
			return metric ? 'C' : 'F'
		}

		const loadingRender = () => {
			if (appState.loading) {
				return (
					<View style={styles.weathersection}>
						<Text style={{color: '#fff'}}> Gathering Weather Data... </Text>
					</View>
				)
			}
			else {
				return (
					<View style={styles.weathersection}>
						<Text style={{color: '#fff'}}>
							{ checkUndefined(appState.main.temp).toString() }&deg;{ getUnits(modeStore.metric) }
						</Text>
						<Text style={{color: '#fff'}}>
							HI: { checkUndefined(appState.main.temp_max).toString() }&deg;{ getUnits(modeStore.metric) }
						</Text>
						<Text style={{color: '#fff'}}>
							LO: { checkUndefined(appState.main.temp_min).toString() }&deg;{ getUnits(modeStore.metric) }
						</Text>
					</View>
				)
			}
		}

		return (
			<View style={styles.currentsection}>
				<Text style={{color: '#fff'}}>Current Weather</Text>
				{ loadingRender() }
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