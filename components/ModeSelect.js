// Libs
import React, { Component } from 'react';
import { observer } from 'mobx-react';

// components
import { Button, StyleSheet, View } from 'react-native';

// stores
import modeStore from '../mobx/modeStore.js';

@observer
class ModeSelect extends Component {
	componentWillMount() {}

	render() {
		return (
			<View style={ModeSelectStyles.modebuttons}>
				<Button
					color='red'
					title='City Name'
					onPress={() => modeStore.cityMode()}
					accessibilityLabel='Search by city name and country code divided by comma, use ISO 3166 country codes'
				/>
				<Button
					color='green'
					title='Long+Lat'
					onPress={() => modeStore.coordinateMode()}
					accessibilityLabel='Search by lat, lon coordinates of the location of your interest'
				/>
				<Button
					color='blue'
					title='Zip Code'
					onPress={() => modeStore.zipMode()}
					accessibilityLabel='Search by zip and ISO 3166 country code'
				/>
				<Button
					color='grey'
					title='City ID'
					onPress={() => modeStore.cityIDMode()}
					accessibilityLabel='Search by city ID from drop-down list'
				/>
			</View>
		);
	}
}

const ModeSelectStyles = StyleSheet.create({
	modebuttons: {
		flex: -2,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default ModeSelect;
