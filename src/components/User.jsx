import { onSnapshot, doc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../Firebase';

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
				<span>{user.name}</span>
				{data?.from !== user1 && data?.unread && (
					<small className="">new</small>
				)}
				<small className={user?.online ? 'online' : null}>
					{user?.online ? 'online' : 'offline'}
				</small>

				{data && (
					<p>
						<p>
							<span>{data?.from === user1 ? 'me:' : null}</span>
							{data.text}
						</p>
					</p>
				)}
			</div>
		</div>
	);
};

export default User;
