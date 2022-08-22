import { ErrorSharp } from '@mui/icons-material';
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

export async function initiateOrder(token){
	try {
		axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
		const { data } = await axios.post('/api/orders');
		return data;
	} catch (error) {
		throw error;
	}
}

export async function initiateGuestCart(){
	try {
		const { data } = await axios.post('/api/guest');
		return data;
	} catch (error) {
		throw error;
	}
} 

export async function getAllProductsOnOrder(orders_id){
	try {
		const { data } = await axios.get(`/api/product_orders/${orders_id}`);
		return data;
	} catch (error) {
		throw error;
	}
}

export async function getAllProductsOnOrderGuest(){
	try {
		const { data } = await axios.get('/api/guest/items');
		return data.items;
	} catch (error) {
		throw error;
	}
}

export async function addProductToOrder(product, order, token){
	try {
		const postData = {
			orders_id: order.id,
			product_id: product.id,
			product_name: product.name,
			price_at_purchase: product.price,
			quantity_order: 1
		}
		axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
		const { data } = await axios.post(`/api/product_orders/add`, postData);
		return data;
	} catch (error) {
		throw error;
	}
}

export async function addProductToOrderGuest(product){
	try {
		const postData = {
			product_id: product.id, 
			product_name: product.name, 
			price_at_purchase: product.price
		}
		const { data } = await axios.post('/api/guest/items', postData)
		return data;
	} catch (error) {
		throw error;
	}
}

export async function removeProductFromOrder(order, product_id){
	try {
		const postData = {
			orders_id: order.id,
			product_id
		}
	
		const { data } = await axios.delete('/api/product_orders/remove', {data: postData})
		return data;
	} catch (error) {
		throw error;
	}
}

export async function removeProductFromOrderGuest(product_id){
	try {
		const postData = {
			product_id
		}

		const { data } = await axios.delete('/api/guest/items', {data: postData})
		return data;
	} catch (error) {
		throw error;
	}
}

export async function getAllProducts(category) {
	try {
    	let apiString = `/api/products`;
    	if (category){
      		apiString += `/${category}`
    	}
		const { data } = await axios.get(apiString);
		return data;
	} catch (error) {
    throw error;
  }
}

export async function getProductById(id) {
	try {
		const { data } = await axios.get(`/api/products/${id}`);
		return data;
	} catch (error) {}
}

export async function login(username, password) {
	try {
		const { data } = await axios.post('/api/users/login', {
			username,
			password,
		});
		return data;
	} catch (error) {
		throw error;
	}
}

export async function register(username, password, email, is_admin) {
	try {
		const { data } = await axios.post('/api/users/register', {
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
