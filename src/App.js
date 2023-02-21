import React, { useContext } from 'react';
import {
	BrowserRouter,
	Routes,
	Route,
	// useNavigate,
	Navigate,
	Outlet,
} from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import './App.css';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Profile from './components/Profile.jsx';
import AuthProvider, { AuthContext } from './context/auth';
// import PrivateRoute from './components/PrivateRoute';
// import { auth, db } from './Firebase';
// import { signOut } from 'firebase/auth';
// import { doc, updateDoc } from 'firebase/firestore';

const App = () => {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route
						path="/signup"
						element={<SignUp />}
					/>
					<Route
						path="/signin"
						element={<SignIn />}
					/>
					<Route element={<PrivateRoute />}>
						<Route
							path="/"
							element={<Home />}
						/>
					</Route>
					<Route element={<PrivateRoute />}>
						<Route
							path="/profile"
							element={<Profile />}
						/>
					</Route>
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	);
};

const PrivateRoute = ({ component: Component, ...props }) => {
	const { user } = useContext(AuthContext);
	return user ? <Outlet {...props} /> : <Navigate to="/signin" />;
};

export default App;
