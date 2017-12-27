// Libs
import React, { Component } from 'react';
// import { observer } from 'mobx-react';

// components
import { StyleSheet, View, Text } from 'react-native';

class Weather extends Component {
	constructor(props) {
		super(props);
		// this.state = {};
	}

	componentWillMount() {}

	render() {
		return (
			<View style={styles.weathersection}>
				<Text style={{color: '#fff'}}>Weather</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	weathersection: {
		flex: -3,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default Weather;