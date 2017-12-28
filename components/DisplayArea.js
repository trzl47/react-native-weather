// Libs
import React, { Component } from 'react';
import { observer } from 'mobx-react';

// components
import { StyleSheet, View, Text } from 'react-native';
import Forecast from './Forecast.js';
import CurrentWeather from './CurrentWeather.js';

// stores
import modeStore from '../mobx/modeStore.js';
import appState from '../mobx/appState.js';

@observer
class DisplayArea extends Component {

	componentWillMount() {}

	render() {
		return (
			<View style={styles.displaysection}>
				{ modeStore.forecast ? <Forecast /> : <CurrentWeather /> }
			</View>
		);
	}
}

const styles = StyleSheet.create({
	displaysection: {
		flex: -1,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default DisplayArea;