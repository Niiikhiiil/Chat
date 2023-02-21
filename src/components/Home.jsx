import React, { useEffect, useState } from 'react';
import { auth, db } from '../Firebase';
import {
	collection,
	query,
	where,
	onSnapshot,
	Timestamp,
	orderBy,
	doc,
	addDoc,
	setDoc,
	getDoc,
	updateDoc,
} from 'firebase/firestore';
import User from './User';
import MessageSend from './MessageSend';
import Messages from './Messages';


const Home = () => {
	// users for sidebar users
	const [users, setUsers] = useState([]);
	//chat
	const [chat, setChat] = useState('');
	//texting
	const [text, setText] = useState('');
	//message array
	const [msgs, setMsgs] = useState([]);
	const user1 = auth?.currentUser?.uid || '';

	// ---------------------------------------------------------------------------------------------

	useEffect(() => {
		const userRef = collection(db, 'users');
		// create query
		const q = query(userRef, where('uid', 'not-in', [user1]));
		// execute query
		const unsub = onSnapshot(q, (querySnapshot) => {
			let users = [];
			querySnapshot.forEach((doc) => {
				users.push(doc.data());
			});
			setUsers(users);
		});
		// console.log(users);
		return () => unsub();
	}, []);

	// -------------------------------------------------------------------------------------------

	// selecting user
	const selectUser = async (user) => {
		setChat(user);
		// console.log(user);
		const user2 = user.uid;
		const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
		const messageRef = collection(db, 'messages', id, 'chat');
		const q = query(messageRef, orderBy('createAt', 'asc'));
		onSnapshot(q, (querySnapshot) => {
			let msgs = [];
			querySnapshot.forEach((doc) => {
				msgs.push(doc.data());
			});
			setMsgs(msgs);
		});
		const docSnap = await getDoc(doc(db, 'lastMsg', id));
		if (docSnap.data().from !== user1) {
			await updateDoc(doc(db, 'lastMsg', id), { unread: false });
		}
	};

	// ----------------------------------------------------------------------------------------------

	const handleSubmit = async (e) => {
		e.preventDefault();
		const user2 = chat.uid;
		const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
		await addDoc(collection(db, 'messages', id, 'chat'), {
			text,
			from: user1,
			to: user2,
			createAt: Timestamp.fromDate(new Date()),
		});
		await setDoc(doc(db, 'lastMsg', id), {
			text,
			from: user1,
			to: user2,
			unread: true,
		});
		setText('');
	};

	// ---------------------------------------------------------------------------------------------

	return (
		<div className="home">
			{/* -------------------------userList -------------------------------------------------- */}
			<div className="userlist">
				{users.map((user) => {
					return (
						<User
							key={user.uid}
							user={user}
							selectUser={selectUser}
							user1={user1}
						/>
					);
				})}
			</div>
			<div className="chatcontent">
				{chat ? (
					<div>
						{/* //--------------------username------------------ */}
						<div className="chatname">{chat.name}</div>

						{/* //----------------messages--------------------------- */}
						<div className="messagesdiv">
							{msgs.length
								? msgs.map((msg, i) => {
										return (
											<Messages
												key={i}
												msg={msg}
												user1={user1}
											/>
										);
								  })
								: null}
						</div>

						{/* //-----------------sending Mesages----------------  */}
						<div className="inputFields">
							<MessageSend
								handleSubmit={handleSubmit}
								text={text}
								setText={setText}
							/>
						</div>
					</div>
				) : (
					<div>Start your conversation by clicking on users</div>
				)}
			</div>
		</div>
	);
};

export default Home;
