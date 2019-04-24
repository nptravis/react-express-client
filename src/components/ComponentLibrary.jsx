import React from 'react'
import styled from 'styled-components'
import { docColors, textColors } from '../constants'

// large button

export const LargeButton = styled.div`
	width: 150px;
	background-color: ${docColors.red};
	border-radius: 20px;
	height: 30px;
	text-align: center;
	display: inline-block;
	&:hover {
		cursor: pointer;
	}

	& > h4 {
		line-height: 30px;
		margin: 0;
		padding: 0;
		color: #fff;
		vertical-align: bottom;
	}
`

export const DeleteButton = styled.span`

	float: right;
	border: 1px solid black;
	background-color: #fff;
	border-radius: 50%;
	padding: 2px;
	color: ${textColors.red}

	&:hover {
		cursor: pointer;
	}


`
