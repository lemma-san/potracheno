import React from 'react';
import { connect } from 'react-redux';
import withRouter from 'react-router/lib/withRouter';
import assign from 'object-assign';

import NewPurchasePage from './new-purchase-page';
import FlexContainer from '../components/FlexContainer';
import Spinner from '../components/spinner';
import fetchEventData from '../actions/fetchEventData';
import getLocalEvents from '../actions/getLocalEvents';

const EDIT = 'EDIT';
const CREATE = 'CREATE';

function renderPreloader() {
	return (
		<FlexContainer alignItems="center" justifyContent="center" fullHeight>
			<Spinner />
		</FlexContainer>
	);
}

const PurchasePage = React.createClass({
	getInitialState() {
		const { path } = this.props.route;
		return {
			mode: /\bnew/.test(path) ? CREATE : EDIT,
		};
	},

	componentDidMount() {
		const { props } = this;
		const { dispatch } = props;
		dispatch(getLocalEvents());
		dispatch(fetchEventData(props.params.id));
	},

	render() {
		const { props, state } = this;
		const { mode } = state;
		const { purchase_id, id } = this.props.params;
		if (props.currentEvent) {
			const { currentEvent, localEvents } = props;

			const myName = localEvents[id];

			const eventParticipants = currentEvent
				.participants
				.slice()
				.sort()
				.filter(x => x !== myName);

			eventParticipants.unshift(myName);

			let purchase = {
				payer: myName,
				participants: eventParticipants,
			};
			if (mode === EDIT) {
				purchase = assign({}, currentEvent.purchases[purchase_id]);
			}

			const data = {
				purchase,
				myName,
				eventParticipants,
			};

			return (
				<NewPurchasePage
					mode={state.mode}
					params={{ id, purchase_id }}
					data={data}
				/>
			);
		}
		return renderPreloader();
	},
});

function mapStateToProps({ events }) {
	return {
		currentEvent: events.currentEvent,
		localEvents: events.localEvents,
	};
}

export default withRouter(connect(mapStateToProps)(PurchasePage));
