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

	componentWillMount() {}

	render() {
		return (
			<View style={styles.forecastsection}>
				{/* <FlatList
					data={[{key: 'a'}, {key: 'b'}]}
					renderItem={({item}) => <Text>{item.key}</Text>}
				/> */}
				<Text style={{color: '#fff'}}>Forecast</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	forecastsection: {
		flex: -2,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default Forecast;