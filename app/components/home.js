import React, { Component } from 'react';

import Arrow from './graph/arrow';
import Conroller from './graph/controller';
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
				edges: [],
				pan:{x:0, y:0},
				zoom:1.0,
				transMatrix: [1,0,0,1,0,0],
				width:960,
				height:400,
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
		this.state.graph.nodes.push({ text: "Start", type: 2, tx: 70, ty: 5 });
		this.state.graph.nodes.push({ text: "node 1", type: 0, tx: 300, ty: 80 });
		this.state.graph.nodes.push({ text: "node 2", type: 0, tx: 500, ty: 80 });
		this.state.graph.nodes.push({ text: "node 3", type: 0, tx: 500, ty: 300 });

		this.state.graph.nodes.push({ text: "end", type: 3, tx: 300, ty: 300 });
		this.state.graph.edges.push({ source: this.state.graph.nodes[0], target: this.state.graph.nodes[1] });
		//1->2
		//
		this.state.graph.edges.push({ source: this.state.graph.nodes[1], target: this.state.graph.nodes[2] });
		this.state.graph.edges.push({ source: this.state.graph.nodes[1], target: this.state.graph.nodes[4] });

		this.state.graph.edges.push({ source: this.state.graph.nodes[2], target: this.state.graph.nodes[3] });
		this.state.graph.edges.push({ source: this.state.graph.nodes[2], target: this.state.graph.nodes[4] });

		this.state.graph.edges.push({ source: this.state.graph.nodes[3], target: this.state.graph.nodes[4] });

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
		} else if (this.state.mouseDownNode) {	// Reposition if sleected

			// let dim = event.target.getBoundingClientRect();
			// let x = event.clientX - dim.left;
			// let y = event.clientY - dim.top;
			// this.state.mouseDownNode.style = undefined
			// this.state.mouseDownNode.tx = parseInt(x);//this.state.mouseDownNode.tx - dx;
			// this.state.mouseDownNode.ty = parseInt(y);//this.state.mouseDownNode.ty - dy;
			// this.forceUpdate();
			// this.state.mouseDownNode = undefined;
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
		//onKeyPress ={(e)=>{this.onKeyDownHandler(e)}}
		this.make_dummy_graph();
		document.addEventListener('keydown',(e)=>{this.onKeyDownHandler(e)});
	}
	componentWillUnmount(){
		document.removeEventListener('keydown');
	}
	/**
	 * @param {object} - value
	 */
	getStyle(node) {

	}
	onWheelHandler(event){
		if(event.deltaY>0){
			//this.state.graph.zoom -=.25;
			//this.forceUpdate();
			this.zoom(0.8);
			
		}else if( event.deltaY< 0){
			// this.state.graph.zoom +=.25;
			// this.forceUpdate();
			this.zoom(1.25);
		}
	}
	pan(dx, dy){     	
		this.state.graph.transMatrix[4] += dx;
		this.state.graph.transMatrix[5] += dy;
					
		this.forceUpdate();
	}
 	zoom(scale)
	{
		for (var i=0; i<this.state.graph.transMatrix.length; i++)
		{
			this.state.graph. transMatrix[i] *= scale;
		}

		this.state.graph.transMatrix[4] += (1-scale)*this.state.graph.width/2;
		this.state.graph.transMatrix[5] += (1-scale)*this.state.graph.height/2;
						
		this.forceUpdate();
	}
	onKeyDownHandler(event){
		
		switch(event.keyCode){
			
			case 37://left arrow 
				this.pan(50,0); this.forceUpdate();
				break;
			case 38://up arrow
				this.pan(0,50); this.forceUpdate();
				break;
			case 39://right arrow
				this.pan(-50,0); this.forceUpdate();
				break;
			case 40://down arrow
				this.pan(0,-50); this.forceUpdate();
				break;
			default:
				
		}
	}
	render() {
		let _scale ="matrix(" +  this.state.graph.transMatrix.join(' ') + ")";// " scale("+this.state.graph.zoom+")";
		let _pan  = "translate("+ +this.state.graph.pan.x+" "+this.state.graph.pan.y+")";
		return (
			<div 	>
				<h2>Arc</h2>
				<svg width={this.state.graph.width} height={this.state.graph.height} style={{ border: "1px solid black" }}
					onDoubleClick={(e) => { this.onDoubleClickHandler(e) } }
					onClick={(e) => { this.onClickHandler(e) } }
					onContextMenu={(e) => this.onContextMenuHandler(e)}
					onWheel={(e)=>{ this.onWheelHandler(e)}}
				    
					>
				
					<Arrow />
					{
						
					}
					<g className="graph" transform={_scale}>
						{
							this.state.graph.edges.map((edge, i) => {
								let y2 = edge.target.ty;
								let y1 = edge.source.ty;
								let x2 = edge.target.tx;
								let x1 = edge.source.tx;
								let dy = y2 - y1;
								let dx = x2 - x1;
								
								let augemnet_x = (dx<0)?0: 50;
								
								let augemnet_y=(dy<0)?0: 50;
							let _d = "M" + edge.source.tx+ "," + edge.source.ty + "L" + edge.target.tx + "," + edge.target.ty;
								if (edge.source.type !== 0)
									_d = "M" + edge.source.tx + "," + (edge.source.ty + 75) + "L" + edge.target.tx + "," + edge.target.ty;
								return (<g key={i}>
									<path className="link" d={_d} style={{ "markerEnd": "url(\"#end-arrow\")" }}></path>
								</g>)
							})
						}
					</g>
					<g transform={_scale}>
						{
							this.state.graph.nodes.map((node, i) => {
							let _translate = "translate(" + (node.tx ) + "," + (node.ty)   + ")";
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
										<rect id={"node_" + i} x="-50" y="-50" width="100" height="100" rx="10" ry="10" style={_style}></rect>
										<text textAnchor="middle">
											<tspan>{node.text}</tspan>

										</text>
									</g>)
								}
							})
						}
					</g>

					<Conroller pan={this.pan.bind(this)} zoom ={this.zoom.bind(this)}/>
				</svg>
			</div >
		)
	}
}
export default Home;
