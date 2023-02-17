import React, { createContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Firebase';
// import { collection, doc, getDocs, limit, query, serverTimestamp, updateDoc, where } from 'firebase/firestore';
// import {status}

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	// const updateFirestoreUser = (user, status) => {
	// 	if (user) {
	// 	  getDocs(
	// 		query(collection(db, "users"), where("uid", "==", user.uid), limit(1))
	// 	  ).then((querySnapshot) => {
	// 		querySnapshot.forEach((u) => {
	// 		  updateDoc(doc(db, "users", user.uid), {
	// 			online: status,
	// 			updatedAt: serverTimestamp(),
	// 		  });
	// 		});
	// 	  });
	// 	}
	//   };
	
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			setUser(user);
			setLoading(false);
		});
	}, []);
	if (loading) {
		return 'Loading...';
	}
	return <AuthContext.Provider value={{user}}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
