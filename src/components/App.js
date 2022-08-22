import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import Products from './Products';
import Admin from './Admin';
import Users from './Users';
import CreateProdAdmin from './CreateProdAdmin';
import EditProdAdmin from './EditProdAdmin';

import { getAllProductsOnOrder, initiateGuestCart } from '../axios-services';


// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import { getAPIHealth } from '../axios-services';
import '../style/App.css';
import SingleProductView from './SingleProductView';
import Cart from './Cart';

const App = () => {
	const [APIHealth, setAPIHealth] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [loggedInUser, setLoggedInUser] = useState({});
	const [cart, setCart] = useState([]);
	const [order, setOrder] = useState();

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

		if (localStorage.token && localStorage.username) {
			setLoggedInUser({
				token: localStorage.token,
				username: localStorage.username,
			});
			initiateOrder(localStorage.token)
				.then(res => {
					setOrder(res)
				})
			} else {
				initiateGuestCart()
				.then(res => {
					setOrder(res)
				})
			}		
	}, []);

	return (
		<div className='app-container'>
			<Router>
				<div className='navbar'>
					<div className='title-cart'>
						<h1>KC Liqours</h1>
						<div>
							<h2 className='white'>
								Hello {loggedInUser.username ? loggedInUser.username : 'Guest'}!
							</h2>

							<Link to='/cart'>
								<h2 className='white'>Cart</h2>
							</Link>
						</div>
					</div>
					<nav>
						<Link className='link' to='/home'>
							Home
						</Link>
						<Link className='link' to='/products'>
							Products
						</Link>
						<Link className='link' to='/admin'>
							Admin
						</Link>
						<Link className='link' to='/login'>
							Login/Logout
						</Link>
					</nav>
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
									loggedInUser={loggedInUser}
									setLoggedInUser={setLoggedInUser}
								/>
							}
						/>
						<Route path='/home' element={<Home />} />
						<Route
							path='/products'
							element={<Products cart={cart} setCart={setCart} />}
						/>
						<Route
							path='/products/beer'
							element={<Products category='beer' />}
						/>
						<Route
							path='/products/wine'
							element={<Products category='wine' />}
						/>
						<Route
							path='/products/spirits'
							element={<Products order={order} setOrder={setOrder} cart={cart} setCart={setCart} token={loggedInUser.token}/>}
						/>
						<Route
							path='/products/beer'
							element={<Products order={order} setOrder={setOrder} cart={cart} setCart={setCart} token={loggedInUser.token} category='beer' />}
						/>
						<Route
							path='/products/wine'
							element={<Products order={order} setOrder={setOrder} cart={cart} setCart={setCart} token={loggedInUser.token} category='wine' />}
						/>
						<Route
							path='/products/spirits'
							element={<Products order={order} setOrder={setOrder} cart={cart} setCart={setCart} token={loggedInUser.token} category='spirits' />}/>
						<Route
							path='/register'
							element={
								<Register
									setUsername={setUsername}
									setPassword={setPassword}
									username={username}
									password={password}
									loggedInUser={loggedInUser}
									setLoggedInUser={setLoggedInUser}
								/>
							}
						></Route>
						<Route
							path='/products/id/:id'
							element={<SingleProductView />}
						></Route>
						<Route
							path='/cart'
							element={<Cart order={order} cart={cart} setCart={setCart} token={loggedInUser.token}/>}
						></Route>
						<Route path='/admin' element={<Admin />} />
						<Route
							path='/admin/viewusers'
							element={<Users token={loggedInUser.token}/>} />
						<Route
							path='/admin/createnewproduct'
							element={<CreateProdAdmin />} />
						<Route
							path='/admin/editproduct'
							element={<EditProdAdmin />} />
					</Routes>
				</div>
			</Router>

			<h1>Hello, World!</h1>
			<p>API Status: {APIHealth}</p>
		</div>
	);
};
export default App;
