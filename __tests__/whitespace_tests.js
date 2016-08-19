import React from 'react';
import { jassy } from '../src/index.js';

const jss = {
	[`.class1,
		.class2,
		.class3`]: {
		background: 'blue'
	},
	'.class4, .class5, .class6': {
		background: 'red'
	},
};

describe('Whitespace', () => {
	it('Properly removes all whitespace', () => {
		expect(jassy(jss)).toBe('.class1{background:blue;}.class2{background:blue;}.class3{background:blue;}.class4{background:red;}.class5{background:red;}.class6{background:red;}');
	});
});
