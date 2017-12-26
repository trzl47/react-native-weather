// Libs
import React, { Component } from 'react';

// components
import { FlatList, StyleSheet, View, Text } from 'react-native';

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