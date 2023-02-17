import React, { useEffect, useState } from 'react';
import { auth, db } from '../Firebase';
import { getDoc, doc } from 'firebase/firestore';
import "../styles/Profile.css"
const Profile = () => {
	const [user, setUser] = useState();

	useEffect(() => {
		getDoc(doc(db, 'users', auth.currentUser.uid)).then((docSnap) => {
			setUser(docSnap.data());
		});
	}, []);

	return user ? (
		<div className='profile'>
			<div className='image'>
				<img
					
					alt="avatar"
				/>
			</div>
			<div className='detail'>
				<h3>Your Profile</h3>
				<p>{user.name}</p>
				<p>{user.email}</p>
				<hr />
				<p> {user.createdAt.toDate().toDateString()}</p>
			</div>
		</div>
	) : null;
};

export default Profile;
