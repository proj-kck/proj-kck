import axios from 'axios';

// this file holds your frontend network request adapters
// think about each function as a service that provides data
// to your React UI through AJAX calls

// for example, if we need to display a list of users
// we'd probably want to define a getUsers service like this:

/* 
  export async function getUsers() {
    try {
      const { data: users } = await axios.get('/api/users')
      return users;
    } catch(err) {
      console.error(err)
    }
  }
*/

export async function getAPIHealth() {
  try {
    const { data } = await axios.get('/api/health');
    return data;
  } catch (err) {
    console.error(err);
    return { healthy: false };
  }
}

export async function getAllProducts(){
  try {
    const { data } = await axios.get('/api/products');
    return data;
  } catch (error) {
    throw error;
  }
}

export async function login(username, password){
  try {
    const { data } = await axios.post('/api/login', {username, password});
    return data;
  } catch (error) {
    throw error;
  }
}

export async function register(username, password, email, is_admin){
  try {
    const { data } = await axios.post('/api/register', {username, password, email, is_admin});
    return data;
  } catch (error) {
    throw error;
  }
}