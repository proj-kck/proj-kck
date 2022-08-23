import React, { useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
// import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { addProductToOrder_Cart, addProductToOrderGuest, getAllProductsOnOrder, getAllProductsOnOrderGuest, removeProductFromOrder, removeProductFromOrderGuest, initiateOrder, initiateGuestCart } from '../axios-services';
import { useNavigate } from 'react-router-dom';

const Cart = (props) => {
	// const [order, setOrder] = useState();
	const order = props.order;
	const cart = props.cart;
	const setCart = props.setCart;
	const navigate = useNavigate();

	const handleDelete = (e, product) => {
		if (localStorage.token) {
			removeProductFromOrder(order, product.product_id)
			.then(res => {
				getAllProductsOnOrder(order.id)
				.then(resProds => {
					setCart(resProds)
			})})
		} else {
			removeProductFromOrderGuest(product.product_id)
			.then(res => {
				getAllProductsOnOrderGuest()
				.then(resProds => {
					setCart(resProds)
				})
			})
		}
	};

	const handleAdd = (e, product) => {
		if (localStorage.token) {
			addProductToOrder_Cart(product, order, localStorage.token)
			.then(res => {
				getAllProductsOnOrder(order.id)
				.then(resProds => {
					setCart(resProds)
			})})
		} else {
			const prod = {id: product.product_id, 
						  name: product.product_name, 
						  price: product.price_at_purchase}
			addProductToOrderGuest(prod)
			.then(res => {
				getAllProductsOnOrderGuest()
				.then(resProds => {
					setCart(resProds)
				})
			})
		}
	};

	useEffect(() => {
		console.log(order)
		if (order === undefined){
			navigate('/');
			return;
		}
		// if (localStorage.token && localStorage.username) {
		// 	initiateOrder(localStorage.token)
		// 		.then(res => {
		// 			setOrder(res)
		// 		})
		// 	} else {
		// 		initiateGuestCart()
		// 		.then(res => {
		// 			setOrder(res)
		// 		})
		// 	}

		if (localStorage.token) {
			getAllProductsOnOrder(order.id)
			.then(res => {
				setCart(res)
			})
		} else {
			getAllProductsOnOrderGuest()
			.then(res => {
				setCart(res)
			})
		}	
	}, []);

	return (
		<div className='cart-area'>
			<h2 style={{ textAlign: 'center'}}>Cart</h2>
			<table>
				<tr>
					<th>Item</th>
					<th>Quantity</th>
					<th>Price</th>
				</tr>
				{cart ? cart.map((item) => (
						<tr key={item.product_name} id={item.id} >
							<td>{item.product_name}</td>
							<td style={{ textAlign: 'center'}}>{item.quantity_order}</td>
							<td>{item.price_at_purchase * item.quantity_order}</td>
							<td>
							<IconButton
									onClick={(e) => handleAdd(e, item)}
									id={item.product_id}
									style={{ color: '#28B463' }}
								>
									<AddIcon></AddIcon>
								</IconButton>

								<IconButton
									onClick={(e) => handleDelete(e, item)}
									id={item.product_id}
									style={{ color: '#D35400' }}
								>
									<RemoveIcon></RemoveIcon>
								</IconButton>
							</td>
						</tr>
					)): null}
			</table>
		</div>
	);
};

export default Cart;
