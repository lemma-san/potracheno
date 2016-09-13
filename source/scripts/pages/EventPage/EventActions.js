import React from 'react';
import EventActionListItem from '../../components/EventActionListItem';

const firstAction = {
	config: {
		icon: 'calendar',
		text: 'создано мероприятие',
	},
};

export default function EventActions(props) {
	return (
		<div>
			{[firstAction].concat(props.actions).reverse().map((item, i) => {
				return (
					<EventActionListItem
						key={i}
						icon={item.config.icon}
						text={item.config.text}
						date={item.config.date}
					/>
				);
			})}
		</div>
	);
}
