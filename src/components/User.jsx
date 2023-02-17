import { onSnapshot, doc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../Firebase';
import '../styles/User.css';

const User = ({ user, selectUser, user1 }) => {
	const user2 = user?.uid;
	const [data, setData] = useState('');

	useEffect(() => {
		const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
		const unsub = onSnapshot(doc(db, 'lastMsg', id), (doc) => {
			setData(doc.data());
		});
		return () => unsub();
	}, []);


	return (
		<div
			onClick={() => selectUser(user)}
			style={{ cursor: 'pointer' }}
			className="user"
		>
			<div>
				{user.name}
				{data?.from !== user1 && data?.unread && (
					<small className="">new</small>
				)}
				<small>{user?.online ? 'online' : 'offline'}</small>
			</div>
			{data && (
				<p>
					{data?.from === user1 ? 'me:' : null}
					<strong>{data.text}</strong>
				</p>
			)}
		</div>
	);
};

export default User;
