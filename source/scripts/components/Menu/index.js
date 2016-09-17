import React, {PropTypes} from 'react';
import EventStatus from '../EventStatus';
import GreySubtitle from '../GreySubtitle';
import UniversalListItem from '../UniversalListItem';

const Menu = React.createClass({
	renderManagerControls() {
		return (
			<div className="menu__top-bar">
				<div className="menu__icons icons-section">
					<div
						onClick={this.props.handleEdit}
						className="icons-section__icon icons-section__icon_event-edit"
					/>
					{false && <div className="icons-section__icon icons-section__icon_add-person" />}
				</div>
			</div>
		);
	},

	renderParticipant(name) {
		const {currentEvent, currentUserName} = this.props;
		const {manager} = currentEvent;
		let displayName = name;

		if (name === currentUserName) {
			displayName += ' (Вы)';
		}

		if (name === manager) {
			displayName += ' ★';
		}

		return (
			<UniversalListItem
				key={name}
				text={displayName}
			/>
		);
	},

	render() {
		const {props} = this;
		const {currentEvent, currentUserName} = props;
		const classes = ['menu', `menu_${props.menuOpen ? 'open' : 'closed'}`];
		const isManager = currentUserName === currentEvent.manager;

		return (
			<div className={classes.join(' ')}>
				<div className="menu__inner">
					{isManager && this.renderManagerControls()}
					<EventStatus name={currentEvent.name} subtitle={props.subtitle} />
					<GreySubtitle text="Участники" />
					<div className="menu__list">
						{currentEvent.participants.map(this.renderParticipant)}
					</div>
					<div onClick={props.handleRelogin} className="menu__bottom-bar bottom-bar">
						<div className="bottom-bar__icon" />
						<div className="bottom-bar__text">Войти под другим именем</div>
					</div>
					<div className="menu__manager-annotation">★ — организатор мероприятия</div>
				</div>
			</div>
		);
	},
});

Menu.propTypes = {
	currentEvent: PropTypes.object.isRequired,
	subtitle: PropTypes.string.isRequired,
};

export default Menu;


// Example
// <Menu participants={currentEvent.participants}
// 		name={currentEvent.name}
// 		subtitle={this.formatSubtitle(currentEvent)}
// />
