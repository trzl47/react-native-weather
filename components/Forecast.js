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
				// initial render has empty array - this is to get past that
				const checkArrayLength = (element) => {
					const tempArr = appState.forecastArr.length < 1 ? ['-','-','-'] : [appState.forecastArr[element].main.temp, appState.forecastArr[element].main.temp_max, appState.forecastArr[element].main.temp_min] ;
					return tempArr;
				}
				return (
					<View style={styles.weathersection}>
						<Text style={{color: '#fff'}}>
						{ checkUndefined(checkArrayLength(0)[0]).toString() }&deg;{ getUnits(modeStore.metric) }
						</Text>
						<Text style={{color: '#fff'}}>
							HI: { checkUndefined(checkArrayLength(0)[1]).toString() }&deg;{ getUnits(modeStore.metric) }
						</Text>
						<Text style={{color: '#fff'}}>
							LO: { checkUndefined(checkArrayLength(0)[2]).toString() }&deg;{ getUnits(modeStore.metric) }
						</Text>
					</View>
				)
			}
		}

		return (
			<View style={styles.forecastsection}>
				<Text style={{color: '#fff'}}>Forecast</Text>
				{ loadingRender() }
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
	weathersection: {
		flex: -3,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default Forecast;