import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './Login';
import Profile from './Profile';
import Register from './Register';
import Home from './Home';

// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import { getAPIHealth } from '../axios-services';
import '../style/App.css';

const App = () => {
	const [APIHealth, setAPIHealth] = useState('');

	useEffect(() => {
		// follow this pattern inside your useEffect calls:
		// first, create an async function that will wrap your axios service adapter
		// invoke the adapter, await the response, and set the data
		const getAPIStatus = async () => {
			const { healthy } = await getAPIHealth();
			setAPIHealth(healthy ? 'api is up! :D' : 'api is down :/');
		};

		// second, after you've defined your getter above
		// invoke it immediately after its declaration, inside the useEffect callback
		getAPIStatus();
	}, []);

	return (
		<div className='app-container'>
			<Router>
				<div className='navbar'>
					<h1>KC Liqours</h1>
					<navbar>
						<Link className='link' to='/home'>
							Home
						</Link>
						<Link className='link' to='/profile'>
							Profile
						</Link>
						<Link className='link' to='/login'>
							Login/Logout
						</Link>
					</navbar>
				</div>
				<div className='main'>
					<Routes>
						<Route path='/login' element={<Login />} />
						<Route path='/home' element={<Home />} />
						<Route path='/profile' element={<Profile />} />
						<Route path='/register' element={<Register />}></Route>
					</Routes>
				</div>
			</Router>

			<h1>Hello, World!</h1>
			<p>API Status: {APIHealth}</p>
		</div>
	);
};

export default App;
