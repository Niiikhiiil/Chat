import React, { useEffect, useRef } from 'react';
import Moment from 'react-moment';


const Messages = ({ msg, user1 }) => {
	const scrollRef = useRef();
	useEffect(() => {
		scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [msg]);
	return (
		<div
			ref={scrollRef}
			className={`messages 
			${msg.from === user1 ? 'own' : 'left'} 
			`}
		>
			<p  className={`${msg.from===user1?'own' : 'left'}`}>
				{/* {msg.from === user1 ? <small>Me:</small> : null} */}
				<span>{msg.text}</span>
				<br />
				<small>
					<Moment fromNow className='time'>{msg.createAt.toDate()}</Moment>
				</small>
			</p>
		</div>
	);
};

export default Messages;
