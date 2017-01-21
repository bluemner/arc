import React, { Component } from 'react';

import Arrow from './arrow';
import Conroller from './controller';
import GraphNode from './graph-nodes';
import GraphEdge from './graph-edge';
import constants from './graph-constants';
/**
 * @extends {Component}
 */
class Graph extends Component {

	constructor(props) {
		super(props);

		this.state = {
			graph: {
				nodes: [],
				edges: [],
				pan: { x: 0, y: 0 },
				zoom: 1.0,
				transMatrix: [1, 0, 0, 1, 100, 0],
				width: 960,
				height: 400

			},
			mode: constants.mode.read,
			grid: false,
			selectedNode: null,
			selectedEdge: null,
			mouseDownNode: null,
			mouseDownLink: null,
			shift: false,
		}

	}
	/**
	 * @override
	 */
	componentWillMount() {

		document.addEventListener('keydown', (e) => { this.onKeyDownHandler(e) });
		document.addEventListener('keyup', (e) => { this.onKeyUpHandler(e) });
	}
	/**
	 * @override
	 */
	componentWillUnmount() {
		document.removeEventListener('keydown');
		document.removeEventListener('keyup');
	}


	// EVENTS

	onClickHandler(event) {

		let _id = (event.target.id) ? event.target.id.split("_")[1] : undefined;
		if (_id) {
			if (this.state.mouseDownNode) {
				this.state.mouseDownNode.style = undefined;
				this.forceUpdate();
			}
			if (this.state.mouseDownNode == this.state.graph.nodes[_id]) {
				this.state.mouseDownNode.style = undefined;
				this.state.mouseDownNode = undefined;
				this.forceUpdate();
				return;
			}
			this.state.mouseDownNode = this.state.graph.nodes[_id];
			this.state.graph.nodes[_id].style = { fill: "#ff00ff" }
			this.forceUpdate();
		} else if (this.state.mouseDownNode && this.state.mode === constants.mode.edit) {	// Reposition if sleected

			let dim = event.target.getBoundingClientRect();

			let x = event.clientX - dim.left;
			let y = event.clientY - dim.top;
			// a*x + c*y + e;
			let dx = this.state.graph.transMatrix[0] * x - this.state.graph.transMatrix[2] * y - this.state.graph.transMatrix[4];
			// b*x + d*y + f
			let dy = (-1) * this.state.graph.transMatrix[1] * x + this.state.graph.transMatrix[3] * y - this.state.graph.transMatrix[5];
			console.log("node change(" + dx + "," + dy + ")");
			this.state.mouseDownNode.style = undefined
			this.state.mouseDownNode.tx = dx;//this.state.mouseDownNode.tx - dx;
			this.state.mouseDownNode.ty = dy;//this.state.mouseDownNode.ty - dy;
			this.state.mouseDownNode = undefined;
			this.forceUpdate();

		}


	}

	/**
	 * @desc right click menu handler
	 * @param {object} event - mouse right click dom event 
	 */
	onContextMenuHandler(event) {
		//	event.preventDefault();
		let _id = (event.target.id) ? event.target.id.split("_")[1] : undefined;
		if (_id) {

		}
	}

	/**
	 * @desc Mouse Double Click  Event Listner
	 * @param {object} event - mouse double click dom event 
	 */
	onDoubleClickHandler(event) {

		let _id = (event.target.id) ? event.target.id.split("_")[1] : undefined;
		if (_id) {
			this.state.mouseDownNode = this.state.graph.nodes[_id];
			this.state.graph.nodes[_id].style = { fill: "#ff00ff" }
			this.forceUpdate();
		} else if (this.state.mouseDownNode && this.state.shift) {
			let dim = event.target.getBoundingClientRect();
			let x = event.clientX - dim.left;
			let y = event.clientY - dim.top;
			this.state.mouseDownNode.style = undefined
			this.state.mouseDownNode.tx = parseInt(x);//this.state.mouseDownNode.tx - dx;
			this.state.mouseDownNode.ty = parseInt(y);//this.state.mouseDownNode.ty - dy;
			this.forceUpdate();
			this.state.mouseDownNode = undefined;
		}


	}

	/**
	 * @desc Mouse Drage  Event Listner
	 * @param {object} event - mouse drag  dom event 
	 */
	onDragHandler(event) {

		let dim = event.target.getBoundingClientRect();
		let x = parseInt(event.clientX - dim.left);
		let y = parseInt(event.clientY - dim.top);
		if (x < 0 || y < 0) return;
		let dx = Math.abs(this.state.mouse.x - x);
		let dy = Math.abs(this.state.mouse.y - y);
		this.state.mouse.x = x;
		this.state.mouse.y = y;
		if (dx % 5 || dy % 5) return;
		console.log("mouse drag(" + x + "," + y + ")");
		// let dx = this.state.mouse.x + event.clientX;
		// let dy = this.state.mouse.y + event.clientY;

		//console.log(this.state.mouse.x, this.state.mouse.y);
		//console.log("(" + this.state.mouseDownNode.tx + "," + this.state.mouseDownNode.ty + ")=>(" + dx + "," + dy + ")");
		if (this.state.mouseDownNode) {
			//this.state.mouseDownNode.tx += parseInt(this.state.mouse.x);//this.state.mouseDownNode.tx - dx;
			//this.state.mouseDownNode.ty += parseInt(this.state.mouse.y);//this.state.mouseDownNode.ty - dy;
			this.state.mouseDownNode.tx = x;
			this.state.mouseDownNode.ty = y;
			//this.forceUpdate();
			// this.state.mouse.x = dx;
			// this.state.mouse.y = dy;

		}

	}
	/**
	 * @desc Mouse Drage End Event Listner
	 * @param {object} event - mouse drag end dom event 
	 */
	onDragEndHandler(event) {
		let dim = event.target.getBoundingClientRect();
		let x = event.clientX - dim.left;
		let y = event.clientY - dim.top;
		if (x < 0 || y < 0) return;
		console.log("drag end(" + x + "," + y + ")");
		if (this.state.mouseDownNode) {
			this.state.mouseDownNode.tx = parseInt(x);//this.state.mouseDownNode.tx - dx;
			this.state.mouseDownNode.ty = parseInt(y);//this.state.mouseDownNode.ty - dy;
		}

	}

	/**
     * @desc handles the key down dom event
     * @param {object} event key down dom event
     */
	onKeyDownHandler(event) {

		switch (event.keyCode) {
			case 16: //shift
				this.state.shift = true;
				break;
			case 37://left arrow 
				this.pan(50, 0); this.forceUpdate();
				break;
			case 38://up arrow
				this.pan(0, 50); this.forceUpdate();
				break;
			case 39://right arrow
				this.pan(-50, 0); this.forceUpdate();
				break;
			case 40://down arrow
				this.pan(0, -50); this.forceUpdate();
				break;
			case 69: //e
				if (this.state.shift) this.toggleEdit();
				break;
			case 71://g
				if (this.state.shift) this.toggleGrid(); // G
				break;
			default:

		}
	}

	/**
     * @desc handles the key down dom event
     * @param {object} event key down dom event
     */
	onKeyUpHandler(event) {

		switch (event.keyCode) {
			case 16: //shift
				this.state.shift = false;
				break;

			default:

		}
	}
	/** 
	 * @desc Mouse Down Event Listner
	 * @param {object} event - mouse down dom event 
	 */
	onMouseDownHandeler(event) {

		let _id = (event.target.id) ? event.target.id.split("_")[1] : undefined;
		if (_id) {
			this.state.mouseDownNode = this.state.graph.nodes[_id];


		}
	}
	/**
	 * @desc Mouse Up Event Listner
	 * @param {object} event - mouse up dom event 
	 */
	onMouseUpHandler(event) {
		let dim = event.target.getBoundingClientRect();
		let x = event.clientX - dim.left;
		let y = event.clientY - dim.top;
		console.log("mouse up(" + x + "," + y + ")");
		if (this.state.mouseDownNode) {
			this.state.mouseDownNode.tx = parseInt(x);
			this.state.mouseDownNode.ty = parseInt(y);
		}

		this.forceUpdate();
	}

	/**
	 * @desc Mouse Wheel Event Listner
	 * @param {object} event - mouse wheel dom event 
	 */
	onWheelHandler(event) {
		if (event.deltaY > 0) {//Scroll Wheel Down
			this.zoom(0.8);

		} else if (event.deltaY < 0) { //Scroll Wheel Up

			this.zoom(1.25);
		}
	}

	//End - EVENTS

	// Helper fuctions
	addNode(nodes) {
		this.state.graph.nodes = nodes;
	}

	addEdges(edges) {
		this.state.graph.edges = edges;
	}


	makeGrid() {
		let _text = [];
		let _min_x = -1 * this.state.graph.width * 2;
		let _min_y = _min_x;
		let i = _min_x;
		for (; i < this.state.graph.width * 4; i += 50) {
			let _d = "M" + i + "," + _min_y + "L" + i + "," + this.state.graph.height * 4;
			_text.push(<g key={i}>  <path className="grid" d={_d}></path></g>);
		}
		for (var j = _min_y; j <= this.state.graph.height * 4; j += 50) {
			let _d = "M" + _min_x + "," + j + "L" + this.state.graph.width * 4 + "," + j;
			_text.push(<g key={(j + i)}><path className="grid" d={_d} ></path></g>);
		}
		return _text;

	}
	/**
	 * @desc change the camera's focus
	 * @param {Number} dx - change in the x postition
	 * @param {Number} dy = change in the y postition
	 */
	pan(dx, dy) {

		this.state.graph.transMatrix[4] += dx;
		this.state.graph.transMatrix[5] += dy;

		this.forceUpdate();
	}

	/**
	 * @desc enables edit mode
	 */
	toggleEdit() {
		this.state.mode = (this.state.mode === constants.mode.edit) ?
			constants.mode.read : constants.mode.edit;
		this.forceUpdate();
	}

	/**
	 * @desc toggles display of the grid on the screen
	 */
	toggleGrid() {
		this.state.grid = !this.state.grid;
		this.forceUpdate();
	}

	/**
	 * @desc update graph scale
	 * @param {Number} scale zoom scale
	 */
	zoom(scale) {
		for (var i = 0; i < this.state.graph.transMatrix.length; i++) {
			this.state.graph.transMatrix[i] *= scale;
		}

		this.state.graph.transMatrix[4] += (1 - scale) * this.state.graph.width / 2;
		this.state.graph.transMatrix[5] += (1 - scale) * this.state.graph.height / 2;

		this.forceUpdate();
	}

	// End - Helper fuctions

	/**
	 * @param {Array} nodes array of node objects
	 * @param {Array} edges array of edge objects
	 * @param {function} addNode - add node fuction
	 * @param {fuction} deleteNode - delete node function
	 * @param {bool} __read allow user to see graph
	 * @param {bool} __write allows user to set edit controlls
	 * @param {bool} __delete allows user to see delete controlls
	 * @override
	 */
	render() {
		const {
			nodes = [],
			edges = [],
			addNode = () => { },
			deleteNode = () => { },
			__read = true,
			__write = true,
			__delete = true,
		} = this.props;
		if (nodes.length > 0) this.addNode(nodes);
		if (edges.length > 0) this.addEdges(edges);
		let _tranform = "matrix(" + this.state.graph.transMatrix.join(' ') + ")";

		return (
			<svg width={this.state.graph.width} height={this.state.graph.height} style={{ border: "1px solid black" }}
				onDoubleClick={(e) => { this.onDoubleClickHandler(e) } }
				onClick={(e) => { this.onClickHandler(e) } }
				onContextMenu={(e) => this.onContextMenuHandler(e)}
				onWheel={(e) => { this.onWheelHandler(e) } }
				>

				<Arrow />

				<g className="grid" transform={_tranform}>
					{(this.state.grid || this.state.mode == constants.mode.edit) ? this.makeGrid() : null}
				</g>


				<g className="graph" transform={_tranform}>
					{
						this.state.graph.edges.map((edge, i) => {
							return <GraphEdge key={i} edge={edge} i={i} />
						})
					}
				</g>
				<g transform={_tranform}>
					{
						this.state.graph.nodes.map((node, i) => {
							return (<GraphNode key={i} node={node} i={i} />);

						})
					}
				</g>

				<Conroller pan={this.pan.bind(this)} zoom={this.zoom.bind(this)} />
			</svg>
		)
	}
};

export default Graph;