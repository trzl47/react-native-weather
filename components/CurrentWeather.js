// Libs
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import moment from 'moment';

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

	componentWillUnmount() {
		// resetting state for if/when component remounts
		appState.main = {};
		appState.weather = [];
	}

	componentDidUpdate() {
		modeStore.inputMode = 0;
	}

	render() {
		const checkUndefined = (value) => {
			return value == undefined ? '-' : value;
		}

		const checkArrayLength = (array) => {
			const tempArr = array.length < 1 ? ['-'] : array;
			return tempArr;
		}

		const formTempArr = (temp,max,min) => {
			return [checkUndefined(temp),checkUndefined(max),checkUndefined(min)];
		}

		const day = moment().format('dddd');
		const time = moment().format('h:mm:ss a')
		const icon = appState.getIcon(checkUndefined(checkArrayLength(appState.weather)[0].icon));

		return (
			<View style={styles.currentsection}>
				<View style={styles.currentrow}>
					<Weather
						day={day}
						time={time}
						icon={icon}
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
		paddingVertical: 20,
	},
});

export default CurrentWeather;