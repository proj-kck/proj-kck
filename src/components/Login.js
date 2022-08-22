import React from 'react';
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { login } from '../axios-services';

const Login = (props) => {
	const navigate = useNavigate();
	const [username, setUsername] = [props.username, props.setUsername];
	const [password, setPassword] = [props.password, props.setPassword];
	const loggedInUser = props.loggedInUser;

	const handleUsernameChange = (e) => {
		setUsername(e.target.value);
	};
	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};
	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			let resp = await login(username, password);
			let token = resp.token;
			let user = { username, token };
			if (!resp.token) {
				alert('Username or password incorrect');
			} else {
				localStorage.setItem('token', token);
				localStorage.setItem('username', username)
				props.setLoggedInUser(user);
				navigate('/products');
			}
			setPassword('');
			setUsername('');
		} catch (error) {
			throw error;
		}
	};
	const handleLogout = async (e) => {
		//e.preventDefault();
		try {
			localStorage.removeItem('username');
			localStorage.removeItem('token');
			props.setLoggedInUser({});
			navigate('/login');
		} catch (error) {
			throw error;
		}
	}

	return (
		<div className='login-container'>
			<form onSubmit={submitHandler}>
				{!loggedInUser.token ? 
				<TextField
					id='outlined-required'
					label='Username'
					variant='outlined'
					value={username}
					onChange={handleUsernameChange}
				/> : <h2 class='loggedIn'>You are logged in as {loggedInUser.username}</h2> }
				{!loggedInUser.token ? <TextField
					id='outlined-required'
					label='Password'
					variant='outlined'
					className='password-field'
					type='password'
					value={password}
					onChange={handlePasswordChange}
				/> : null }
				{!loggedInUser.token ? <Button
					variant='contained'
					onClick={submitHandler}
					type='submit'
				>
					Login
				</Button> : 
				<Button
					variant='contained'
					onClick={handleLogout}
					type='submit'
					>
						Logout
					</Button> }
				{' '}
				{!loggedInUser.token ? <a href='/register'>Register?</a> : null }
			</form>
		</div>
	);
};

export default Login;
