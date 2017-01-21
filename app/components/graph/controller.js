import React, { Component } from 'react';

/**
 * @extends {Component}
 */
class Conroller extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const { pan, zoom } = this.props;
		return (

			<g>
				<circle cx="50" cy="50" r="42" fill="white" opacity="0.75"/>
				<path className="compass-button" onClick={(e)=>{pan(0,50)}}  d="M50 10 l12 20 a40,70 0 0,0 -24,0z" />
				<path className="compass-button" onClick={(e)=>{pan(50,0)}}  d="M10 50 l20 -12 a70,40 0 0,0 0,24z" />
				<path className="compass-button" onClick={(e)=>{pan(0,-50)}}  d="M50 90 l12 -20 a40,70 0 0,1 -24,0z" />
				<path className="compass-button" onClick={(e)=>{pan(-50,0)}}  d="M90 50 l-20 -12 a70,40 0 0,1 0,24z" />
				
				<circle className="compass" cx="50" cy="50" r="20"/>
				<circle className="compass-button"  cx="50" cy="41" r="8" onClick={(e)=>{zoom(0.8)}}/>
				<circle className="compass-button"  cx="50" cy="59" r="8" onClick={(e)=>{zoom(1.25)}}/>

				<rect className="plus-minus" x="46" y="39.5"  width="8" height="3"/>
				<rect className="plus-minus" x="46" y="57.5"  width="8" height="3"/>
				<rect className="plus-minus" x="48.5" y="55" width="3" height="8"/>
		</g>
		);
 		
	}
}
export default Conroller;