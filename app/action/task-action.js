import constants, { ActionType } from '../constants/constants'

/**
 * @desc makes and action object
 * @param {string} action_type describes action
 * @param {string} data entities data
 */
function makeAction(action_type, data) {
	return action = {
		type: action_type,
		data: data
	}
}

/**
 * @desc Gets runs the ajax get command to call the api
 * @param {object} dispatch redux dispatch
 */
function ajaxGetTask(dispatch) {
	$.ajax({
		url: '',
		type: 'GET',
		dataType: 'json',
		error: function () {
			$('#info').html('<p>An error has occurred</p>');
		},
		success: function (data) {
			return dispatch(makeAction(ActionType.GET_TASK, data));
		},
	});
}


/**
 * @desc Gets runs the ajax get command to call the api
 * @param {object} dispatch redux dispatch
 */
function ajaxGetTask(dispatch) {
	$.ajax({
		url: '',
		type: 'GET',
		dataType: 'json',
		error: function () {
			$('#info').html('<p>An error has occurred</p>');
		},
		success: function (data) {
			return dispatch(makeAction(ActionType.GET_TASK, data));
		},
	});
}

/**
 * @desc Get task from server
 */
export default function getTask() {
	return dispatch => {
		ajaxGetTask(dispatch);
	}
}