// Libs
import React, { Component } from 'react';
import { observable } from 'mobx';

class modeStore {
	@observable inputMode = 0;
	@observable forecast = false;
	@observable metric = false;

	cityMode = () => {
		this.inputMode = 0;
	};

	coordinateMode = () => {
		this.inputMode = 1;
	};

	zipMode = () => {
		this.inputMode = 2;
	};

	cityIDMode = () => {
		this.inputMode = 3;
	};

	searchChange = () => {
		this.forecast = !this.forecast;
	}

	unitChange = () => {
		console.log(`units changed to ${this.metric}`);
	}
}

export default new modeStore();