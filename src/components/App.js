import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import Products from './Products';

// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import { getAPIHealth } from '../axios-services';
import '../style/App.css';
import SingleProductView from './SingleProductView';

const App = () => {
	const [APIHealth, setAPIHealth] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [loggedInUser, setLoggedInUser] = useState({});

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
					<div className='title-cart'>
						<h1>KC Liqours</h1>
						<a href='/'>
							<h2>Cart</h2>
						</a>
					</div>
					<navbar>
						<Link className='link' to='/home'>
							Home
						</Link>
						<Link className='link' to='/products'>
							Products
						</Link>
						<Link className='link' to='/login'>
							Login/Logout
						</Link>
					</navbar>
				</div>
				<div className='main'>
					<Routes>
						<Route
							path='/login'
							element={
								<Login
									setUsername={setUsername}
									setPassword={setPassword}
									username={username}
									password={password}
									// users={users}
									loggedInUser={loggedInUser}
									setLoggedInUser={setLoggedInUser}
								/>
							}
						/>
						<Route path='/home' element={<Home />} />
						<Route path='/products' element={<Products />} />
						<Route path='/products/beer' element={<Products category='beer'/>} />
						<Route path='/products/wine' element={<Products category='wine'/>} />
						<Route path='/products/spirits' element={<Products category='spirits'/>} />
						<Route
							path='/register'
							element={
								<Register
									setUsername={setUsername}
									setPassword={setPassword}
									username={username}
									password={password}
									// users={users}
									loggedInUser={loggedInUser}
									setLoggedInUser={setLoggedInUser}
								/>
							}
						></Route>
						<Route
							path='/products/id/:id'
							element={<SingleProductView />}
						></Route>
					</Routes>
				</div>
			</Router>
			<p>API Status: {APIHealth}</p>
		</div>
	);
};

export default App;
