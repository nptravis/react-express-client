import React from 'react';
import Responsive from 'react-responsive';

export const baseUrl = 'http://localhost:3000'

export const textColors = {
	black: '#2e2e2e',
	grey: '#6c6c6c',
	lightGrey: '#b4b4b4',
	red: '#f62f5e',
	white: '#ffffff'
} 

export const docColors = {
	black: '#2e2e2e',
	grey: '#6c6c6c',
	lightGrey: '#f7f7f7',
	red: '#f62f5e',
	blue: '#6eb2fb',
	brown: '#f1ad3d',
	aqua: '#00d3ca',
	yellow: '#effc90'
} 

export const breakpoints = {
	small: '599',
	medium: '600',
	large: '900',
	larger: '1200',
	largest: '1800'
}

export const Desktop = props => <Responsive {...props} minWidth={600} />;
export const Mobile = props => <Responsive {...props} maxWidth={599.99} />;