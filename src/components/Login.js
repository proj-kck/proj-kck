import React from 'react';
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { login } from '../axios-services';

const Login = (props) => {
	const navigate = useNavigate();
	const [username, setUsername] = [props.username, props.setUsername];
	const [password, setPassword] = [props.password, props.setPassword];

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
		} catch (error) {}
	};

	return (
		<div className='login-container'>
			<form onSubmit={submitHandler}>
				<TextField
					id='outlined-required'
					label='Username'
					variant='outlined'
					value={username}
					onChange={handleUsernameChange}
				/>
				<TextField
					id='outlined-required'
					label='Password'
					variant='outlined'
					className='password-field'
					type='password'
					value={password}
					onChange={handlePasswordChange}
				/>
				<Button
					variant='contained'
					onClick={submitHandler}
					type='submit'
				>
					Login
				</Button>{' '}
				<a href='/register'>Register?</a>
			</form>
		</div>
	);
};

export default Login;
