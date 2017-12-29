// Libs
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import moment from 'moment';

// components
import { FlatList, ScrollView, StyleSheet, View, Text } from 'react-native';
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

	componentWillUnmount() {
		// resetting state for if/when component remounts
		appState.forecastArr = [];
	}

	componentDidUpdate() {
		modeStore.inputMode = 0;
	}

	render() {
		const checkArrayLength = (array) => {
			const tempArr = array.length < 1 ? ['-','-','-'] : array;
			return tempArr;
		}

		// map data to Weather components
		const weatherArrMap = (arr) => {
			const weatherCards = arr.map((weathercard) => {
				// create temperature array
				const weathercardArr = checkArrayLength([weathercard.main.temp, weathercard.main.temp_max, weathercard.main.temp_min]);

				// caluclate dates
				const api = weathercard.dt_txt;
				const day = moment(api).format('dddd');
				const time = moment(api).format('h:mm:ss a')
				const icon = appState.getIcon(weathercard.weather[0].icon);

				return (
					<Weather
						day={day}
						time={time}
						tempArr={weathercardArr}
						icon={icon}
						key={arr.indexOf(weathercard)} />
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
					weatherArrMap(appState.forecastArr)
				)
			}
		}

		return (
			<View style={styles.forecastsection}>
				<View style={styles.forecastrow}>
					<ScrollView
						contentContainerStyle={styles.contentContainer}
						horizontal={true}
						showsHorizontalScrollIndicator={false}>
						{ loadingRender() }
  				</ScrollView>
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
	contentContainer: {
			paddingVertical: 20,
			alignItems: 'center',
			justifyContent: 'center',
		}
});

export default Forecast;