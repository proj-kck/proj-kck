import React, { useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
// import { ConstructionOutlined } from '@mui/icons-material';
import {
	getAllProductsOnOrder,
	getAllProductsOnOrderGuest,
	removeProductFromOrder,
	removeProductFromOrderGuest,
} from '../axios-services';

const Cart = (props) => {
	const order = props.order;
	const cart = props.cart;
	const setCart = props.setCart;
	const token = props.token;

	const handleDelete = (e, product) => {
		if (token) {
			removeProductFromOrder(order, id).then((res) => {
				getAllProductsOnOrder(order.id).then((res) => {
					setCart(res);
				});
			});
		} else {
			removeProductFromOrderGuest(id).then((res) => {
				getAllProductsOnOrderGuest().then((res) => {
					setCart(res);
				});
			});
		}
	};

	const handleAdd = (e, product) => {
		if (token) {
			getAllProductsOnOrder(order.id).then((res) => {
				setCart(res);
			});
		} else {
			getAllProductsOnOrderGuest().then((res) => {
				setCart(res);
			});
		}
	};

	return (
		<div className='cart-area'>
			<h2 style={{ textAlign: 'center' }}>Cart</h2>
			<table>
				<tr>
					<th>Item</th>
					<th>Quantity</th>
					<th>Price</th>
				</tr>
				{cart.map((item) => (
					<tr key={item.product_name} id={item.id}>
						<td>{item.product_name}</td>
						<td>{item.quantity_order}</td>
						<td>{item.price_at_purchase * item.quantity_order}</td>
						<td>
							<IconButton
								onClick={(e) =>
									handleDelete(e, item.product_id)
								}
								id={item.product_id}
							>
								<DeleteIcon></DeleteIcon>
							</IconButton>
						</td>
					</tr>
				))}
			</table>
		</div>
	);
};

export default Cart;
