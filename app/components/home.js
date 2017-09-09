import React, { Component } from 'react';

import Graph from './graph/graph';
import constants from './graph/graph-constants';

/**
 * @extends {Component}
 */
class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			graph: {
				nodes: [],
				edges: [],
			},
			selectedNode: undefined
		}
	}
	componentWillMount() {
		this.make_dummy_graph();
	}
	make_dummy_graph() {
		this.state.graph.nodes.push({ id: 6, text: "Start", type: constants.node.type.start, tx: 50, ty: 50 });
		this.state.graph.nodes.push({ id: 1, text: "Application", type: constants.node.type.state, tx: 300, ty: 50 });
		this.state.graph.nodes.push({ id: 2, text: "Special Letter", type: constants.node.type.state, tx: 500, ty: 50 });
		this.state.graph.nodes.push({ id: 3, text: "Some really long text", type: constants.node.type.state, tx: 500, ty: 300 });

		this.state.graph.nodes.push({ id: 4, text: "end", type: constants.node.type.end, tx: 300, ty: 300 });
		this.state.graph.edges.push({ id: 5, source: this.state.graph.nodes[0], target: this.state.graph.nodes[1] });
		//1->2
		//
		this.state.graph.edges.push({ id: 1, source: this.state.graph.nodes[1], target: this.state.graph.nodes[2] });
		this.state.graph.edges.push({ id: 2, source: this.state.graph.nodes[1], target: this.state.graph.nodes[4] });

		this.state.graph.edges.push({ id: 3, source: this.state.graph.nodes[2], target: this.state.graph.nodes[3] });
		this.state.graph.edges.push({ id: 4, source: this.state.graph.nodes[2], target: this.state.graph.nodes[4] });

		this.state.graph.edges.push({ id: 5, source: this.state.graph.nodes[3], target: this.state.graph.nodes[4] });

	}
	addNode(text) {
		this.state.graph.nodes.push({ text: text, type: constants.node.type.state, tx: 0, ty: 0 });
		this.forceUpdate();
	}
	updateNode(node) {

	}
	selectedNode(node) {
		this.state.selectedNode = node;
		if (node) {

		} else {

		}
		this.forceUpdate();
	}

	/**
	 *  @override
	 */
	render() {
		return (
			<div>
				<h2>Arc</h2>
				<Graph
					selectedNode={this.selectedNode.bind(this)}
					edges={this.state.graph.edges}
					nodes={this.state.graph.nodes}
				/>

			</div >
		)
	}
}
export default Home;
