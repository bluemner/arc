import React, { Component } from 'react';
import { DropdownButton, MenuItem, FormGroup, FormControl, HelpBlock, ControlLabel } from 'react-bootstrap';
/**
 * @extends {Component}
 */
class Applications extends Component {
	constructor(props) {
		super(props);
		this.state = { value: '' };
		this.handleChange = this.handleChange.bind(this);
		//this.getValidationState = this.getValidationState.bind(this);
	}

	componentWillMount() {
	}
	getValidationState() {
		const length = this.state.value.length;
		if (length > 10) return 'success';
		else if (length > 5) return 'warning';
		else if (length > 0) return 'error';
	}
	handleChange(e) {
		this.state.value = e.target.value;
		this.forceUpdate();
	}
	render() {
		return (
			<div>
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
				<form>

					<FormGroup
						controlId="formBasicText"
						validationState={this.getValidationState()}
					>
						<ControlLabel>Working example with validation</ControlLabel>
						<FormControl
							type="text"
							value={this.state.value}
							placeholder="Enter text"
							onChange={this.handleChange}
						/>
						<FormControl.Feedback />
						<HelpBlock>Validation is based on string length.</HelpBlock>
					</FormGroup>
					<div className="form-row">
						<div className="form-group col-md-6">
							<div className="input-group">
								<span className="input-group-addon" id="basic-addon1">Server</span>
								<input type="text" list="browsers" className="form-control" placeholder="Server" aria-describedby="basic-addon1" />
								<datalist id="browsers">
									<option value="MSSQL" />
									<option value="MYSQL" />
								</datalist>
							</div>
						</div>

						<div>
							<DropdownButton title="Dropdown" id="bg-nested-dropdown">
								<MenuItem href="#books">Books</MenuItem>
								<MenuItem href="#podcasts">Podcasts</MenuItem>
								<MenuItem href="#">Tech I Like</MenuItem>
								<MenuItem href="#">About me</MenuItem>
								<MenuItem href="#addBlog">Add a Blog</MenuItem>
							</DropdownButton>
						</div>
					</div>



				</form>
			</div>
		);
	}
}
export default Applications;