import React, { useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { register } from '../axios-services';

const Register = (props) => {
	const navigate = useNavigate();
	const [username, setUsername] = [props.username, props.setUsername];
	const [password, setPassword] = [props.password, props.setPassword];
	const [email, setEmail] = React.useState('');
	const loggedInUser = props.loggedInUser;

	useEffect(() => {
		if (loggedInUser.username) {
			alert(`Logged in already as ${loggedInUser.username}`);
			navigate(-1);
		}
	});

	const handleUsernameChange = (e) => {
		setUsername(e.target.value);
	};
	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};
	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};
	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			let resp = await register(username, password, email, false);
			console.log(resp);
		} catch (error) {
			console.log(error);
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
					label='Email'
					variant='outlined'
					value={email}
					onChange={handleEmailChange}
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
					Register
				</Button>{' '}
			</form>
		</div>
	);
};

export default Register;
