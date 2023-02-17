import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import { auth, db } from '../Firebase';
import { signOut } from 'firebase/auth';
import { updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth';

const Navbar = () => {
	const { user } = useContext(AuthContext);
	const navigate = useNavigate();
	const handleSignOut = async () => {
		await updateDoc(doc(db, 'users', auth.currentUser.uid), {
			online: false,
		});
		await signOut(auth);
		navigate('/signin');
	};
	return (
		<nav className="nav">
			<h2>
				<Link to="/">Chat</Link>
			</h2>
			<div>
				{user ? (
					<>
						<Link to="/profile">Profile</Link>
						<button
							type="submit"
							onClick={handleSignOut}
							className="btn"
						>
							Sign Out
						</button>
					</>
				) : (
					<>
						<Link to="/signup">Sign Up</Link>
						<Link to="/signin">Sign in</Link>
					</>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
