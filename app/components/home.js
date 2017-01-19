import React, { Component } from 'react';

/**
 * @extends {Component}
 */
class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			mouse: { x: undefined, y: undefined },
			rect: {
				x: 0,
				h: 0,
				width: 100,
				height: 100,
			},
			dim: null,
			circle: { r: 50 },
			graph: {
				nodes: [],
				edges: []
			},
			selectedNode: null,
			selectedEdge: null,
			mouseDownNode: null,
			mouseDownLink: null,
			justDragged: false,
			justScaleTransGraph: false,
			lastKeyDown: -1,
			shiftNodeDrag: false,
			selectedText: null
		}
	}

	make_dummy_graph() {
		this.state.graph.nodes.push({ text: "node 1", type: 1, tx: 455, ty: 100 });
		this.state.graph.nodes.push({ text: "node 2", type: 1, tx: 455, ty: 300 });
		this.state.graph.nodes.push({ text: "node A", type: 0, tx: 60, ty: 60 });
		this.state.graph.nodes.push({ text: "Start", type: 2, tx: 200, ty: 200 });
		this.state.graph.nodes.push({ text: "State", type: 3, tx: 200, ty: 400 });
		this.state.graph.edges.push({ source: this.state.graph.nodes[1], target: this.state.graph.nodes[0] });
	}
	close_to(expeted, actual, tolerance) {
		if (Math.abs(expeted - actual) < tolerance)
			return true
		return false;
	}
	onMouseDownHandeler(event) {
		// let dim = event.target.getBoundingClientRect();
		// let x = event.clientX - dim.left;
		// let y = event.clientY - dim.top;
		// let _nodes = this.state.graph.nodes;
		// for (var i = 0; i < _nodes.length; ++i) {
		// 	if (this.close_to(_nodes[i].tx, x, 50) && this.close_to(_nodes[i].ty, y, 50)) {
		// 		this.state.mouseDownNode = _nodes[i];
		// 		break;
		// 	}
		// }



		let _id = (event.target.id) ? event.target.id.split("_")[1] : undefined;
		if (_id) {
			this.state.mouseDownNode = this.state.graph.nodes[_id];


		}

	}
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
	onMouseUpHandler(event) {
		let dim = event.target.getBoundingClientRect();
		let x = event.clientX - dim.left;
		let y = event.clientY - dim.top;
		console.log("mouse up(" + x + "," + y + ")");
		if (this.state.mouseDownNode) {
			this.state.mouseDownNode.tx = parseInt(x);//this.state.mouseDownNode.tx - dx;
			this.state.mouseDownNode.ty = parseInt(y);//this.state.mouseDownNode.ty - dy;
		}

		this.forceUpdate();
		//this.state.mouseDownNode = undefined;

	}
	onClickHandler(event) {

		let _id = (event.target.id) ? event.target.id.split("_")[1] : undefined;
		if (_id) {
			if (this.state.mouseDownNode) {
				this.state.mouseDownNode.style = undefined;
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
		} else if (this.state.mouseDownNode) {	// Reposition if sleected

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
	onDoubleClickHandler(event) {

		let _id = (event.target.id) ? event.target.id.split("_")[1] : undefined;
		if (_id) {
			this.state.mouseDownNode = this.state.graph.nodes[_id];
			this.state.graph.nodes[_id].style = { fill: "#ff00ff" }
			this.forceUpdate();
		} else if (this.state.mouseDownNode) {
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
	onContextMenuHandler(event) {
		//	event.preventDefault();
		let _id = (event.target.id) ? event.target.id.split("_")[1] : undefined;
		if (_id) {

		}
	}
	componentWillMount() {
		this.make_dummy_graph();
	}
	render() {
		return (
			<div>
				<h2>Arc</h2>
				<svg width="960" height="800" style={{ border: "1px solid black" }}
					onDoubleClick={(e) => { this.onDoubleClickHandler(e) } }
					onClick={(e) => { this.onClickHandler(e) } }
					onContextMenu={(e) => this.onContextMenuHandler(e)}
					>
					<defs>
						<marker id="end-arrow" viewBox="0 -5 10 10" refX="32" markerWidth="3.5" markerHeight="3.5" orient="auto">
							<path d="M0,-5L10,0L0,5"></path>
						</marker>
						<marker id="mark-end-arrow" viewBox="0 -5 10 10" refX="7" markerWidth="3.5" markerHeight="3.5" orient="auto">
							<path d="M0,-5L10,0L0,5"></path>
						</marker>
					</defs>

					<g className="graph">
						{
							this.state.graph.edges.map((edge, i) => {
								let _d = "M" + edge.source.tx + "," + edge.source.ty + "L" + edge.target.tx + "," + edge.target.ty;
								return (<g key={i}>
									<path className="link" d={_d} style={{ "markerEnd": "url(\"#end-arrow\")" }}></path>
								</g>)
							})
						}
					</g>
					<g>
						{
							this.state.graph.nodes.map((node, i) => {
								let _translate = "translate(" + node.tx + "," + node.ty + ")";
								let _style = (node.style) ? node.style : {};
								_style = (node.active) ? {} : _style;
								switch (node.type) {
									case 3:
										return (<g key={i} className="conceptG" transform={_translate}  >
											<circle id={"node_" + i} r="50" style={_style}></circle>
											<circle id={"node_" + i} r="30" stroke="black" strokeWidth="3" style={{ fill: "red" }} />
											<text textAnchor="middle" dy="0">
												<tspan>{node.text}</tspan>
											</text>
										</g>)
									case 2:
										_style = (node.active) ? { fill: "yellow" } : { fill: "green" }
										return (<g key={i} className="conceptG" transform={_translate} >
											<rect id={"node_" + i} x="0" y="0" width="100" height="100" rx="10" ry="10" style={_style} transform="rotate(45)"></rect>
											<text textAnchor="middle" dy="75" dx="0">
												<tspan>{node.text}</tspan>
											</text>
										</g>)
									case 1:
										return (<g key={i} className="conceptG" transform={_translate}  >
											<circle id={"node_" + i} r="50" style={_style}></circle>
											<text textAnchor="middle" dy="0">
												<tspan>{node.text}</tspan>
											</text>
										</g>)
									case 0:
									default: return (<g key={i} className="conceptG" transform={_translate} >
										<rect id={"node_" + i} x="0" y="0" width="100" height="100" rx="10" ry="10" style={_style}></rect>
										<text textAnchor="middle" dy="50" dx="50">
											<tspan>{node.text}</tspan>

										</text>
									</g>)
								}
							})
						}
					</g>
				</svg>
			</div >
		)
	}
}
export default Home;

/*
		<svg width="960" height="800">
					<defs>
						<marker id="end-arrow" viewBox="0 -5 10 10" refX="32" markerWidth="3.5" markerHeight="3.5" orient="auto">
							<path d="M0,-5L10,0L0,5"></path>
						</marker>
						<marker id="mark-end-arrow" viewBox="0 -5 10 10" refX="7" markerWidth="3.5" markerHeight="3.5" orient="auto">
							<path d="M0,-5L10,0L0,5"></path>
						</marker>
					</defs>
					<g className="graph">
						<path className="link dragline hidden" d="M0,0L0,0" style={{ "markerEnd": "url(\"#mark-end-arrow\")" }}></path>
						<g>
							<path className="link" d="M455,300L455,100" style={{ "markerEnd": "url(\"#end-arrow\")" }}></path>
						</g>

						<g>
							<path className="link" d="M200,500L455,100" style={{ "markerEnd": "url(\"#end-arrow\")" }}></path>
						</g>
						<g>
							<path className="link" d="M650,500L455,100" style={{ "markerEnd": "url(\"#end-arrow\")" }}></path>
						</g>
						{
							//Nodes
						}
						<g>
							<g className="conceptG" transform="translate(455,100)">
								<circle r="50"></circle>
								<text textAnchor="middle" dy="-7.5">
									<tspan>new</tspan>
									<tspan x="0" dy="15">concept</tspan>
								</text>
							</g>
							<g className="conceptG" transform="translate(455,300)">
								<circle r="50"></circle>
								<text textAnchor="middle" dy="-7.5">
									<tspan>new</tspan>
									<tspan x="0" dy="15">concept</tspan>
								</text>
							</g>

							<g className="conceptG" transform="translate(200,500)">
								<circle r="50"></circle>
								<text textAnchor="middle" dy="-7.5">
									<tspan>new</tspan>
									<tspan x="0" dy="15">concept</tspan>
								</text>
							</g>

							<g className="conceptG" transform="translate(600,500)">
								<rect x="0" y="0" width="100" height="100" rx="10" ry="10"></rect>
								<text textAnchor="middle" dy="50" dx="50">
									<tspan>new</tspan>
									<tspan x="50" dy="15">concept</tspan>
								</text>
							</g>
						</g>
					</g>
				</svg>
				*/