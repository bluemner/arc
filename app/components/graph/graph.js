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
				height: 400,
				style: {
					cursor: "default",
					border: "1px solid black"
				}
			},

			mode: constants.mode.read,
			grid: false,
			selectedNode: null,
			selectedEdge: null,

			mouseSelect: {
				rightClick: {
					node: undefined,
					edge: undefined
				},
				source: null,
				target: null
			},

			mouseClickNode: null,
			mouseDownNode: null,
			mouseUpNode: null,
			mouseDownLink: null,
			mouse: {
				x: undefined,
				y: undefined
			},
			shift: false,
			control: false,
			contextMenu: {
				left: 0,
				top: 0,
				styles: {
					display: "none",
					zIndex: "1000",
					position: "absolute",
					overflow: "hidden",
					border: "1px solid #CCC",
					whiteSpace: "nowrap",
					background: "#FFF",
					color: "#333",
					borderRadius: "5px",

				},
				active: false
			}
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
		const {	selectedNode = () => { } } = this.props;

		let dim = event.target.getBoundingClientRect();

		const x = event.clientX - dim.left;
		const y = event.clientY - dim.top;

		if (x > this.state.graph.width || y > this.state.graph.height) { return }

		let _id = (event.target.id) ? event.target.id.split("_")[1] : undefined;
		if (_id) {
			if (this.state.mouseClickNode) {
				this.state.mouseClickNode.style = undefined;
				this.forceUpdate();

			}
			if (this.state.mouseClickNode == this.state.graph.nodes[_id]) {
				this.state.mouseClickNode.style = undefined;
				this.state.mouseClickNode = undefined;
				this.forceUpdate();
				return;
			}
			this.state.mouseClickNode = this.state.graph.nodes[_id];
			this.state.graph.nodes[_id].style = { fill: "#ff00ff" }
			selectedNode(this.state.mouseClickNode);
			this.forceUpdate();
		} else if (this.state.mouseClickNode && this.state.mode === constants.mode.edit) {	// Reposition if sleected


			//Note haven't got this working might fix later
			// let a = this.state.graph.transMatrix[0];
			// let b = this.state.graph.transMatrix[1];
			// let c = this.state.graph.transMatrix[2];
			// let d = this.state.graph.transMatrix[3];
			// let e = this.state.graph.transMatrix[4];
			// let f = this.state.graph.transMatrix[5];

			// // a*x + c*y + e;

			// let _matrix = [[a, c, e], [b, d, f], [0, 0, 1]];


			// let dx = ((a * x) + (c * y) - e);  // (a * x + c * y - e);

			// // b*x + d*y + f
			// let dy = b * x + d * y - f; // y + f * this.state.graph.zoom;
			// console.log(this.state.graph.transMatrix);
			// console.log("change Point(" + dx + "," + dy + ") zoom:" + this.state.graph.zoom);


			// this.state.mouseDownNode.style = undefined


			// //this.state.mouseDownNode.tx = dx;;
			// //Ethis.state.mouseDownNode.ty = dy;//this.state.mouseDownNode.ty - dy;

			// this.state.mouseDownNode = undefined;
			// this.forceUpdate();

		} else if (this.state.mouseClickNode) {
			selectedNode(undefined);
			this.state.mouseClickNode.style = undefined;
			this.state.mouseClickNode = undefined;
			this.forceUpdate();
		}


	}

	/**
	 * @desc right click menu handler
	 * @param {object} event - mouse right click dom event 
	 */
	onContextMenuHandler(event) {
		event.preventDefault(); //disable right click?
		let _split = event.target.id.split("_");
		let _id = (event.target.id && _split.length > 1) ? parseInt(_split[1]) : undefined;
		if (_id && _split[0] === "node") {
			this.state.mouseSelect.rightClick.node = this.state.graph.nodes.filter((e) => { return e.id === _id })[0];
			this.state.mouseSelect.rightClick.edge = undefined;
		} else if (_id && _split[0] === "edge") {
			this.state.mouseSelect.rightClick.edge = this.state.graph.edges.filter((e) => { return e.id === _id })[0];
			this.state.mouseSelect.rightClick.node = undefined;
		}

		let dim = event.currentTarget.getBoundingClientRect();

		let x = parseInt(event.clientX - dim.left);
		let y = parseInt(event.clientY - dim.top);



		this.state.contextMenu.left = x;
		this.state.contextMenu.top = y;
		this.forceUpdate();
		this.toggleContextMenu(true);

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

	onDragStartHandler(event) {
		console.log("Drag Start");

		let dim = event.currentTarget.getBoundingClientRect();

		let x = parseInt(event.clientX - dim.left);
		let y = parseInt(event.clientY - dim.top);

		let a = this.state.graph.transMatrix[0];
		let b = this.state.graph.transMatrix[1];
		let c = this.state.graph.transMatrix[2];
		let d = this.state.graph.transMatrix[3];
		let e = this.state.graph.transMatrix[4];
		let f = this.state.graph.transMatrix[5];

		// a*x + c*y + e;
		let dx = ((1 / a) * x) + (c * y) - (e / a);
		// b*x + d*y + f
		let dy = (b * x) + ((1 / d) * y) - (f / d);

		this.state.mouse.x = parseInt(dx);
		this.state.mouse.y = parseInt(dy);
		let _id = (event.target.id) ? event.target.id.split("_")[1] : undefined;
		if (_id && this.state.shift) {
			this.state.mouseDownNode = this.state.graph.nodes[_id];
			this.state.graph.nodes[_id].style = { fill: "#7304a3" }
			this.move = true;

			this.forceUpdate();
		}

		console.log("Mouse Down(" + dx + "," + dy + ")");
	}
	/**
	 * @desc Mouse Drage End Event Listner
	 * @param {object} event - mouse drag end dom event 
	 */
	onDragEndHandler(event) {
		this.onMouseUp(event);
	}

	/**
     * @desc handles the key down dom event
     * @param {object} event key down dom event
     */
	onKeyDownHandler(event) {
		//event.preventDefault();

		//Use shift for as comand key uncomment preventDefault for ctl\command or alt\option keys
		let mode_key = this.state.shift;
		// MAC'S SUCK
		if (event.metaKey) {
			this.state.control = true;
			console.log("macs suck");
			return;
		}
		//Normal Codes
		switch (event.keyCode) {
			case 16: //shift
				this.state.shift = true;
				break;
			case 17: //ctl
				//case 224: //MAC's Suck command key?
				//case 91: //MAC's Suck command key?
				this.state.control = true;
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
			case 65: //a
				if (this.state.mode == constants.mode.edit) this.moveNode(-50, 0);
				break;
			case 68: //d
				if (this.state.mode == constants.mode.edit) this.moveNode(50, 0);
				break;
			case 69: //e
				if (mode_key) this.toggleEdit();
				break;
			case 71://g
				if (mode_key) this.toggleGrid(); // G
				break;
			case 83: //s
				if (this.state.mode == constants.mode.edit) this.moveNode(0, 50);
				break;
			case 87: //w
				if (this.state.mode == constants.mode.edit) this.moveNode(0, -50);
				break;
			default:

		}
	}

	/**
     * @desc handles the key down dom event
     * @param {object} event key down dom event
     */
	onKeyUpHandler(event) {

		// MAC'S SUCK
		if (event.metaKey) {
			this.state.control = false;
			return;
		}
		switch (event.keyCode) {
			case 16: //shift
				event.preventDefault();
				this.state.shift = false;
				break;
			case 17:
				event.preventDefault();
				this.state.control = false;
				break;
			default:

		}
	}
	/** 
	 * @desc Mouse Down Event Listner
	 * @param {object} event - mouse down dom event 
	 */
	onMouseDownHandeler(event) {
		let dim = event.currentTarget.getBoundingClientRect();

		let x = parseInt(event.clientX - dim.left);
		let y = parseInt(event.clientY - dim.top);

		let a = this.state.graph.transMatrix[0];
		let b = this.state.graph.transMatrix[1];
		let c = this.state.graph.transMatrix[2];
		let d = this.state.graph.transMatrix[3];
		let e = this.state.graph.transMatrix[4];
		let f = this.state.graph.transMatrix[5];

		// a*x + c*y + e;
		let dx = ((1 / a) * x) + (c * y) - (e / a);
		// b*x + d*y + f
		let dy = (b * x) + ((1 / d) * y) - (f / d);

		this.state.mouse.x = parseInt(dx);
		this.state.mouse.y = parseInt(dy);
		let _id = (event.target.id) ? event.target.id.split("_")[1] : undefined;
		if (_id && this.state.shift) {
			this.state.mouseDownNode = this.state.graph.nodes[_id];
			this.state.graph.nodes[_id].style = { fill: "#7304a3" }
			this.move = true;

			this.forceUpdate();
		}

		console.log("Mouse Down(" + dx + "," + dy + ")");
	}
	onMouseLeaveHandler(event) {
		this.toggleContextMenu();
	}
	/**
	 * @desc Mouse Drage  Event Listner
	 * @param {object} event - mouse drag  dom event 
	 */
	onDragHandler(event) {
		let dim = event.currentTarget.getBoundingClientRect();
		let x = parseInt(event.clientX - dim.left);
		let y = parseInt(event.clientY - dim.top);
		if (x < 0 || y < 0) { return };

		let a = this.state.graph.transMatrix[0];
		let b = this.state.graph.transMatrix[1];
		let c = this.state.graph.transMatrix[2];
		let d = this.state.graph.transMatrix[3];
		let e = this.state.graph.transMatrix[4];
		let f = this.state.graph.transMatrix[5];

		// a*x + c*y + e;
		let dx = ((1 / a) * x) + (c * y) - (e / a);
		// b*x + d*y + f
		let dy = (b * x) + ((1 / d) * y) - (f / d);

		if (this.state.mouseDownNode && this.state.shift) {
			//console.log("mouse drag(" + dx + "," + dy + ")");
			this.state.mouseDownNode.tx = dx;
			this.state.mouseDownNode.ty = dy;
			this.state.mouse.x = dx;
			this.state.mouse.y = dy;
			this.forceUpdate();
		}

	}
	/**
	 * @desc Mouse Up Event Listner
	 * @param {object} event - mouse up dom event 
	 */
	onMouseUpHandler(event) {
		let dim = event.currentTarget.getBoundingClientRect();
		let x = parseInt(event.clientX - dim.left);
		let y = parseInt(event.clientY - dim.top);


		if (this.state.mouseDownNode && this.state.shift) {

			if (x < 0 || y < 0) { return };

			let a = this.state.graph.transMatrix[0];
			let b = this.state.graph.transMatrix[1];
			let c = this.state.graph.transMatrix[2];
			let d = this.state.graph.transMatrix[3];
			let e = this.state.graph.transMatrix[4];
			let f = this.state.graph.transMatrix[5];

			// a*x + c*y + e;
			let dx = ((1 / a) * x) + (c * y) - (e / a);
			// b*x + d*y + f
			let dy = (b * x) + ((1 / d) * y) - (f / d);
			this.state.mouseDownNode.tx = dx;
			this.state.mouseDownNode.ty = dy;

			this.state.mouseDownNode.style = {}
			this.state.mouseDownNode = undefined;
			this.forceUpdate();
		} else {
			let _id = (event.target.id) ? event.target.id.split("_")[1] : undefined;
		}
		console.log("mouse up");

		this.move = undefined;
		this.forceUpdate();
	}
	updateCursor(cursor = constants.cursor.default) {
		this.state.graph.style.cursor = cursor;
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
	addEdge(edge) {
		this.state.graph.edges.push(edge);
		this.forceUpdate();
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

	moveNode(dx, dy) {
		if (this.state.mouseClickNode) {
			this.state.mouseClickNode.tx = this.state.mouseClickNode.tx + dx;
			this.state.mouseClickNode.ty = this.state.mouseClickNode.ty + dy;
			this.forceUpdate();
		}
	}
	/**
	 * @desc change the camera's focus
	 * @param {Number} dx - change in the x postition
	 * @param {Number} dy = change in the y postition
	 */
	pan(dx, dy) {
		this.state.graph.pan.x = dx;
		this.state.graph.pan.y = dy;
		this.state.graph.transMatrix[4] += dx;
		this.state.graph.transMatrix[5] += dy;

		this.forceUpdate();
	}
	remove(event) {
		if (this.state.mouseSelect.rightClick.node) {
			this.state.graph.nodes = this.state.graph.nodes.filter((e) => { return e.id !== this.state.mouseSelect.rightClick.node.id });
		} else if (this.state.mouseSelect.rightClick.edge) {
			this.state.graph.edges = this.state.graph.edges.filter((e) => { return e !== this.state.mouseSelect.rightClick.edge });
		}
		this.forceUpdate();
	}
	selectNode(event, value) {
		console.log("here");


		if (value === constants.edge.source) {
			this.state.mouseSelect.source = this.state.mouseSelect.rightClick.node;

		} else if (value === constants.edge.target) {
			this.state.mouseSelect.target = this.state.mouseSelect.rightClick.node;
		}

		if (this.state.mouseSelect.source && this.state.mouseSelect.target) {
			this.addEdge({ id: parseInt(-1 * this.state.graph.edges.length), source: this.state.mouseSelect.source, target: this.state.mouseSelect.target });
			this.state.mouseSelect.source = undefined;
			this.state.mouseSelect.target = undefined;
			this.forceUpdate();
		}
	}
	/**
	 * @desc toggles the context menu
	 */
	toggleContextMenu(active = false) {
		this.state.contextMenu.active = active;
		let _style = Object.assign(this.state.contextMenu.styles, {});
		if (this.state.contextMenu.active) {

			_style.display = "block"
			this.state.contextMenu.styles = _style;
		} else {
			_style.display = "none"
			this.state.contextMenu.styles = _style;
		}
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
		this.state.graph.zoom *= scale;
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
	 * @param {function} addNode add node function
	 * @param {function} deleteNode delete node function
	 * @param {function} selectedNode selected node function
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
			updateNode = () => { },
			deleteNode = () => { },
			selectedNode = () => { },
			addEdge = () => { },
			delteEdge = () => { },
			selectedEdge = () => { },
			__read = true,
			__write = true,
			__delete = true,
		} = this.props;
		if (nodes.length > 0) this.addNode(nodes);
		if (edges.length > 0) this.addEdges(edges);
		let _tranform = "matrix(" + this.state.graph.transMatrix.join(' ') + ")";

		return (
			<div>
				<ul className='custom-menu list-group'
					style={{ left: this.state.contextMenu.left, top: this.state.contextMenu.top, display: this.state.contextMenu.styles.display }}
					onMouseLeave={(e) => { this.onMouseLeaveHandler(e) } }>
					<li data-action="add" className="list-group-item">Add node</li>
					<li data-action="source" className="list-group-item" onClick={(e) => { this.selectNode(e, constants.edge.source) } }>Select Source</li>
					<li data-action="target" className="list-group-item" onClick={(e) => { this.selectNode(e, constants.edge.target) } }>Select Target</li>
					<li data-action="target" className="list-group-item" onClick={(e) => { this.remove(e) } }>Delete Target</li>
				</ul>
				<svg width={this.state.graph.width} height={this.state.graph.height} style={this.state.graph.style}
					onDoubleClick={(e) => { this.onDoubleClickHandler(e) } }
					onClick={(e) => { this.onClickHandler(e) } }
					onContextMenu={(e) => this.onContextMenuHandler(e)}
					onWheel={(e) => { this.onWheelHandler(e) } }
					onMouseDown={(e) => { this.onMouseDownHandeler(e) } }
					onMouseUp={(e) => { this.onMouseUpHandler(e) } }
					onMouseMove={(e) => { this.onDragHandler(e) } }
					>

					<Arrow />

					<g className="grid" transform={_tranform}>
						{(this.state.grid || this.state.mode == constants.mode.edit) ? this.makeGrid() : null}
					</g>


					<g className="graph" transform={_tranform} >
						{
							this.state.graph.edges.map((edge, i) => {
								return <GraphEdge key={i} edge={edge} i={i} />
							})
						}
					</g>
					<g transform={_tranform} >
						{
							this.state.graph.nodes.map((node, i) => {
								return (<GraphNode key={i} node={node} i={i} />);

							})
						}
					</g>

					<Conroller pan={this.pan.bind(this)} zoom={this.zoom.bind(this)} />
				</svg>
			</div>
		)
	}
};

export default Graph;