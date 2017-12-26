// Libs
import React, { Component } from 'react';

// components
import { StyleSheet, View, Text } from 'react-native';
import Forecast from './Forecast.js';

class DisplayArea extends Component {

	componentWillMount() {}

	render() {
		return (
			<View style={styles.displaysection}>
				<Text style={{color: '#fff'}}>Display Area</Text>
				<Forecast />
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