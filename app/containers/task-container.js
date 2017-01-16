import React, { Component } from 'react';

class TaskContainer extends Component {
	constructor(props) {
		super(prop);

	}
	render() {
		return (
			<div>
			</div>
		)
	}
}

const mapStateToProps = function (state) {
	return {
		tasks: state.taskReducer.tasks
	}
}
export default connect(
	mapStateToProps,
	{ getTasks }
)(TaskContainer);