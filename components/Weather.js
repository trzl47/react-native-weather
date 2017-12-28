// Libs
import React, { Component } from 'react';
import { observer } from 'mobx-react';

// components
import { StyleSheet, View, Text } from 'react-native';

// stores
import modeStore from '../mobx/modeStore.js';
import appState from '../mobx/appState.js';

@observer
class Weather extends Component {
	constructor(props) {
		super(props);
		// this.state = {};
	}

	componentWillMount() {}

	render() {
		// console.log(this.props.tempArr);
		const checkUndefined = (value) => {
			return value == undefined ? '-' : value;
		}

		const getUnits = (metric) => {
			return metric ? 'C' : 'F';
		}

		const loadingRender = () => {
			if (appState.loading) {
				return (
					<View style={styles.weathersection}>
						<Text style={{color: '#fff'}}> Gathering Weather Data... </Text>
					</View>
				)
			}
			else {
				return (
					<View style={styles.weathersection}>
						<Text style={{color: '#fff'}}>
						{ checkUndefined(this.props.tempArr[0]).toString() }&deg;{ getUnits(modeStore.metric) }
						</Text>
						<Text style={{color: '#fff'}}>
							HI: { checkUndefined(this.props.tempArr[1]).toString() }&deg;{ getUnits(modeStore.metric) }
						</Text>
						<Text style={{color: '#fff'}}>
							LO: { checkUndefined(this.props.tempArr[2]).toString() }&deg;{ getUnits(modeStore.metric) }
						</Text>
					</View>
				)
			}
		}
		return (
			<View style={styles.weathersection}>
				<Text style={{color: '#fff'}}>Weather</Text>
					{ loadingRender() }
			</View>
		);
	}
}

const styles = StyleSheet.create({
	weathersection: {
		flex: -4,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default Weather;