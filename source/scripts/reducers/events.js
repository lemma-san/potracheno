import {handleActions} from 'redux-actions';

import {
	CREATE_EVENT_LOADING,
	CREATE_EVENT_SUCCESS,
	CREATE_EVENT_ERROR,

	READ_EVENTS_LOADING,
	READ_EVENTS_SUCCESS,
	READ_EVENTS_ERROR,

	FETCH_EVENT_DATA_LOADING,
	FETCH_EVENT_DATA_SUCCESS,
	FETCH_EVENT_DATA_ERROR,

	CHANGE_CURRENT_EVENT,
	CREATE_PURCHASE,

	GET_LOCAL_EVENTS,
	SET_LOCAL_EVENTS,
} from '../constants';


const {assign} = Object;
const initialState = {
	events: [],
	eventsById: {},
	localEvents: {},
	currentEvent: null,
	isCreatingEvent: false,
	isFetchingEvent: false,
	loaded: false,
};

export default handleActions({
	[FETCH_EVENT_DATA_LOADING]: (state) => assign({}, state, {
		isFetchingEvent: true,
	}),

	[FETCH_EVENT_DATA_ERROR]: (state) => assign({}, state, {
		isFetchingEvent: false,
	}),

	[FETCH_EVENT_DATA_SUCCESS]: (state, {payload}) => {
		return assign({}, state, {
			eventsById: Object.assign({}, state.eventsById, {
				[payload.key]: payload.value,
			}),
			currentEvent: payload.value,
			isFetchingEvent: false,
		});
	},

	[CREATE_EVENT_LOADING]: (state) => assign({}, state, {
		isCreatingEvent: true,
	}),

	[CREATE_EVENT_SUCCESS]: stopCreatingEvent,
	[CREATE_EVENT_ERROR]: stopCreatingEvent,

	[READ_EVENTS_LOADING]: (state) => assign({}, state, {
		isReadingEvents: true,
	}),

	[READ_EVENTS_SUCCESS]: (state, {payload}) => {
		return assign({}, state, {
			events: Object.keys(payload),
			eventsById: payload,
			loaded: true,
		});
	},

	[READ_EVENTS_ERROR]: (state) => assign({}, state, {
		isReadingEvents: false,
	}),
	[CHANGE_CURRENT_EVENT]: (state, {payload}) => assign({}, state, {
		currentEvent: state.eventsById[payload],
	}),

	[CREATE_PURCHASE]: (state, {payload}) => {
		const currentEvent = Object.assign({}, state.currentEvent);
		currentEvent.purchases = Object.assign({}, currentEvent.purchases, {
			[payload.key]: payload.purchaseData,
		});
		return Object.assign({}, state, {
			currentEvent,
			eventsById: Object.assign({}, state.eventsById, {
				[currentEvent.id]: currentEvent,
			}),
		});
	},

	[GET_LOCAL_EVENTS]: (state, {payload}) => {
		return Object.assign({}, state, {localEvents: payload});
	},

	[SET_LOCAL_EVENTS]: (state, {payload}) => {
		return Object.assign({}, state, {localEvents: payload});
	},
}, initialState);

function stopCreatingEvent(state, payload) {
	return assign({}, state, {
		isCreatingEvent: false,
	});
}
