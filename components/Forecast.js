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
		const checkArrayLength = (array) => {
			// const tempArr = appState.forecastArr.length < 1 ? ['-','-','-'] : [appState.forecastArr[element].main.temp, appState.forecastArr[element].main.temp_max, appState.forecastArr[element].main.temp_min] ;
			const tempArr = array.length < 1 ? ['-','-','-'] : array;
			return tempArr;
		}

		const weatherArrMap = (arr) => {
			// console.log(arr.length);
			const weatherCards = arr.map((weathercard) => {
				const weathercardArr = checkArrayLength([weathercard.main.temp, weathercard.main.temp_max, weathercard.main.temp_min]);
				console.log(weathercardArr);
				return (
					<Weather tempArr={weathercardArr} key={arr.indexOf(weathercard)} />
				);
			});
			return weatherCards;
		}

		const loadingRender = () => {
			if (appState.loading) {
				return (
						<Text style={{color: '#fff'}}> Gathering Weather Data... </Text>
				)
			}
			else {
				return (
					// <Text style={{color: '#fff'}}> Weather Data Row  </Text>
					weatherArrMap(appState.forecastArr)
				)
			}
		}

		return (
			<View style={styles.forecastsection}>
				<View style={styles.forecastrow}>
					<Text style={{color: '#fff'}}>Forecast Row</Text>
					{/* <Weather tempArr={checkArrayLength(0)} /> */}
					{ loadingRender() }
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