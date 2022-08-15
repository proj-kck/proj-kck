import React, { useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
	const navigate = useNavigate();
	const [username, setUsername] = [props.username, props.setUsername];
	const [password, setPassword] = [props.password, props.setPassword];
	const loggedInUser = props.loggedInUser;
	const users = props.users;

	useEffect(() => {
		if (loggedInUser.username) {
			alert(`Logged in already as ${loggedInUser.username}`);
			navigate(-1);
		}
	});

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
			const user = {};
			user.username = username;
			user.password = password;
			props.setLoggedInUser(user);
			navigate('/home');
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
