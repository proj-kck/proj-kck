import React from 'react';
import { TextField, Box, Button } from '@mui/material';

const Login = (props) => {
	const [username, setUsername] = [props.username, props.setUsername];
	const [password, setPassword] = [props.password, props.setPassword];
	const users = props.users;

	const handleUsernameChange = (e) => {
		setUsername(e.target.value);
		console.log(username);
	};
	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
		console.log(password);
	};
	const submitHandler = (e) => {
		e.preventDefault();
		if (password === users[username]) {
			alert('Welcome');
			props.setLoggedInUser({});
		} else {
			alert('Bugging out');
		}
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
					Login/Register
				</Button>{' '}
			</form>
		</div>
	);
};

export default Login;
