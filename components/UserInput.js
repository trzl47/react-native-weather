// Libs
import React, { Component } from 'react';

// components
import { StyleSheet, View } from 'react-native';
import ModeSelect from './ModeSelect.js';
import InputSection from './InputSection.js';

class UserInput extends Component {

	componentWillMount() {}

	render() {
		return (
			<View style={styles.inputsection}>
				<ModeSelect />
				<InputSection />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	inputsection: {
		flex: -1,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default UserInput;