import React, { Component } from 'react';

/**
 * @extends {Component}
 */
class Databases extends Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {

	}
	render() {
		return (
			<div className="table-responsive">
				<table className="table table-bordered">
					<thead>
						<tr>
							<th>Name</th>
							<th>Server</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Bill Gates</td>
							<td>Bill Gates</td>
						</tr>
						<tr>
							<td>Test Gates</td>
							<td>Test Gates</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}
export default Databases;