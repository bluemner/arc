/**
 * @desc graph constants file
 */
module.exports = {
	node: {
		type: {
			default: 0,
			start: 1,
			end: 2,
			state: 3,
			rhombus: 4,
			entity: 5
		}
	},
	edge: {
		source: -1,
		target: -2,
		type: {
			default: 0,
		}
	},
	mode:
	{
		read: 0,
		edit: 1
	},
	cursor: {
		default: "default",
		none: "none",
		pointer: "pointer",
		zoomIn: "zoom-in",
		zoomOut: "zoom-out",
		grab: "grab",
		move: "move"
	}

};