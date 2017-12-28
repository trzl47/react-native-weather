// Libs
import React, { Component } from 'react';
import { observer } from 'mobx-react';

// components
import { Image, StyleSheet, StatusBar, Text, TextInput, View } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import UserInput from './components/UserInput.js';
import DisplayArea from './components/DisplayArea.js';

// stores
import appState from './mobx/appState.js';
import modeStore from './mobx/modeStore.js';

@observer
class App extends Component {
	render() {
		return (
			<View style={styles.container}>
				<StatusBar hidden />
				<Text style={{color: '#fff'}}>Weather App!</Text>
				<Button
					color='black'
					title={ modeStore.forecast ? 'Get Current Weather' : 'Get 5-day Forecast' }
					onPress={() => modeStore.searchChange()}
					accessibilityLabel='Change Request Mode'
				/>
				<UserInput />
				<DisplayArea />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#3b5998',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default App;