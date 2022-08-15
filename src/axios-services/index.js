import axios from 'axios';

export async function getAPIHealth() {
	try {
		const { data } = await axios.get('/api/health');
		return data;
	} catch (err) {
		console.error(err);
		return { healthy: false };
	}
}

export async function getAllProducts() {
	try {
		const { data } = await axios.get('/api/products');
		return data;
	} catch (error) {}
}

export async function getProductById(id) {
	try {
		const { data } = await axios.get(`/api/products/${id}`);
		return data;
	} catch (error) {}
}

export async function login(username, password) {
	try {
		const { data } = await axios.post('/api/login', { username, password });
		return data;
	} catch (error) {
		throw error;
	}
}

export async function register(username, password, email, is_admin) {
	try {
		const { data } = await axios.post('/api/register', {
			username,
			password,
			email,
			is_admin,
		});
		return data;
	} catch (error) {
		throw error;
	}
}
