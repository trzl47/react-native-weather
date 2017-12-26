// Libs
import React, { Component } from 'react';
import { observer } from 'mobx-react';

// components
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

// stores
import modeStore from '../mobx/modeStore.js';
import appState from '../mobx/appState.js';

const citySearch = () => {
	return (
		<View style={InputStyles.inputrow}>
		<Text> City Name: </Text>
		<TextInput
			style={{height: 40}}
			onChangeText={(text) => appState.updateSearchCity(text)}
			value={appState.searchCity}
		/>
		<Text> Country: </Text>
		<TextInput
			style={{height: 40}}
			onChangeText={(text) => appState.updateCountryCode(text)}
			value={appState.countryCode}
		/>
	</View>
	);
};

const coordSearch = () => {
	return (
		<View style={InputStyles.inputrow}>
		<Text> Longitude </Text>
		<TextInput
			style={{height: 40}}
			onChangeText={(text) => appState.updateLongitude(text)}
			value={appState.longitude}
		/>
		<Text> Latitude </Text>
		<TextInput
			style={{height: 40}}
			onChangeText={(text) => appState.updateLatitude(text)}
			value={appState.latitude}
		/>
	</View>
	);
};

const zipSearch = () => {
	return (
		<View style={InputStyles.inputrow}>
		<Text> Zip </Text>
		<TextInput
			style={{height: 40}}
			onChangeText={(text) => appState.updateZipCode(text)}
			value={appState.latitude}
		/>
		<Text> Country </Text>
		<TextInput
			style={{height: 40}}
			onChangeText={(text) => appState.updateCountryCode(text)}
			value={appState.zipcode}
		/>
	</View>
	);
};

const idSearch = () => {
	return (
		<View style={InputStyles.inputrow}>
			<Text> CityID </Text>
			<TextInput
				style={{height: 40}}
				// onChangeText={(text) => this.setState({text})}
				value={'cityList'}
			/>
		</View>
	);
};

@observer
class InputSection extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentWillMount() {}

	render() {
		const inputChange = () => {4
			if(modeStore.inputMode == 0 ) {
				return citySearch();
			}
			else if(modeStore.inputMode == 1 ) {
				return coordSearch();
			}
			else if(modeStore.inputMode == 2 ) {
				return zipSearch();
			}
			else if(modeStore.inputMode == 3 ) {
				return idSearch();
			}
		};

		return (
			<View style={InputStyles.inputsection}>
				{ inputChange() }
				<Button
					color='black'
					title={ appState.loading ? 'Loading...' : 'Submit' }
					onPress={(e) => appState.handleSubmit(e)}
					accessibilityLabel='Get weather'
				/>
			</View>
		);
	}
}

const InputStyles = StyleSheet.create({
	inputsection: {
		flex: -2,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#fff'
	},
	inputrow: {
		flex: -3,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#fff'
	},
});

export default InputSection;