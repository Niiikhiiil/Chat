import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../Firebase';
import { updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
	const [data, setData] = useState({
		email: '',
		password: '',
		error: null,
		loading: false,
	});

	const navigate = useNavigate();

	const { email, password, error, loading } = data;

	const handleChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setData({ ...data, error: null, loading: true });
		if (!email || !password) {
			setData({ ...data, error: 'All fields are required' });
		}
		try {
			// creating new user with createUserWithEmailAndPassword
			const result = await signInWithEmailAndPassword(
				auth,
				email,
				password,
			);
			//setdata to database
			await updateDoc(doc(db, 'users', result.user.uid), {
				online: true,
		
			});
			setData({
				email: '',
				password: '',
				error: null,
				loading: false,
			});
			navigate('/');
		} catch (err) {
			setData({ ...data, error: err.message, loading: false });
		}
	};
	return (
		<section>
			<h3>Log In</h3>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="email">Email</label>
					<input
						type="text"
						name="email"
						value={email}
						onChange={handleChange}
					/>
				</div>
				<div>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						name="password"
						value={password}
						onChange={handleChange}
					/>
				</div>
				{error ? <p>{error}</p> : null}
				<div>
					<button disabled={loading}>
						{loading ? 'Please wait...' : 'Sign IN'}
					</button>
				</div>
			</form>
		</section>
	);
};

export default SignIn;
