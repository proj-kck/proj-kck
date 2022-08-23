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
import {
	initiateGuestCart,
	initiateOrder,
	isTokenAdmin,
} from '../axios-services';
import '../style/App.css';
import SingleProductView from './SingleProductView';
import Cart from './Cart';

const App = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [loggedInUser, setLoggedInUser] = useState({});
	const [cart, setCart] = useState([]);
	const [order, setOrder] = useState();
	const [isAdmin, setIsAdmin] = useState(false);

	useEffect(() => {
		if (localStorage.token && localStorage.username) {
			setLoggedInUser({
				token: localStorage.token,
				username: localStorage.username,
			});
			initiateOrder(localStorage.token).then((res) => {
				setOrder(res);
			});
		} else {
			initiateGuestCart().then((res) => {
				setOrder(res);
			});
		}
	}, []);

	return (
		<div className='app-container'>
			<Router>
				<div className='navbar'>
					<div className='title-cart'>
						<h1 className='site-title'>KC Liqours</h1>
						<div>
							<h2 className='white'>
								Hello{' '}
								{loggedInUser.username
									? loggedInUser.username
									: 'Guest'}
								!
							</h2>

							<Link className='white' to='/cart'>
								<ShoppingCartIcon></ShoppingCartIcon>
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
						{isAdmin ? (
							<Link className='link' to='/admin'>
								Admin
							</Link>
						) : null}
						<Link className='link' to='/login'>
							Login/Logout
						</Link>
					</nav>
				</div>
				<div className='main'>
					<Routes>
						<Route path='/' element={<Home></Home>} />
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
							element={
								<Products
									order={order}
									setOrder={setOrder}
									cart={cart}
									setCart={setCart}
									token={loggedInUser.token}
								/>
							}
						/>
						<Route
							path='/products/beer'
							element={
								<Products
									order={order}
									setOrder={setOrder}
									cart={cart}
									setCart={setCart}
									token={loggedInUser.token}
									category='beer'
								/>
							}
						/>
						<Route
							path='/products/wine'
							element={
								<Products
									order={order}
									setOrder={setOrder}
									cart={cart}
									setCart={setCart}
									token={loggedInUser.token}
									category='wine'
								/>
							}
						/>
						<Route
							path='/products/spirits'
							element={
								<Products
									order={order}
									setOrder={setOrder}
									cart={cart}
									setCart={setCart}
									token={loggedInUser.token}
									category='spirits'
								/>
							}
						/>
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
							path='/products/:id'
							element={<SingleProductView />}
						></Route>
						<Route
							path='/cart'
							element={
								<Cart
									order={order}
									cart={cart}
									setCart={setCart}
									token={loggedInUser.token}
								/>
							}
						></Route>
					</Routes>
				</div>
			</Router>
		</div>
	);
};
export default App;
