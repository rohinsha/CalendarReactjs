import React, {Component} from 'react';

export default class HourlyEvent extends Component {
	
	render() {
		return (
			<li key={this.props.key}> {this.props.listitem} </li>			
		)
	}
}
