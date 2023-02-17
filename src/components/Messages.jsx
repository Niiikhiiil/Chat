import React, { useEffect, useRef } from 'react';
import Moment from 'react-moment';
import '../styles/Messages.css';

const Messages = ({ msg, user1 }) => {
	const scrollRef = useRef();
	useEffect(() => {
		scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [msg]);
	return (
		<div
			ref={scrollRef}
			className={`messages ${msg.from === user1 ? 'own' : 'left'}`}
		>
			<p>
				{msg.from === user1 ? <small>Me:</small> : null}
				<span className={`${msg.from===user1?null: "leftText"}`}>{msg.text}</span>
				<br />
				<small>
					<Moment fromNow>{msg.createAt.toDate()}</Moment>
				</small>
			</p>
		</div>
	);
};

export default Messages;
