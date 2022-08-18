import React, { useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
// import { ConstructionOutlined } from '@mui/icons-material';
import { getAllProductsOnOrder, removeProductFromOrder } from '../axios-services';

const Cart = (props) => {
	const order = props.order;
	const cart = props.cart;
	const setCart = props.setCart;

	const setProductsToCart = async () => {
		const products = await getAllProductsOnOrder(order.id);
		setCart(products[0]);
	}
	

	const handleDelete = (e, id) => {
		const removeProduct = async () => {
			const delProduct = await removeProductFromOrder(order, id);
		} 
		
		removeProduct();

		setProductsToCart();

	};

	useEffect(() => {
		setProductsToCart();
	}, [cart]);

	return (
		<div className='cart-area'>
			<h2>Cart</h2>
			<table>
				<tr>
					<th>Item</th>
					<th>Quantity</th>
					<th>Price</th>
				</tr>
				{cart.map((item) => (
						<tr key={item.product_name} id={item.id} >
							<td>{item.product_name}</td>
							<td>{item.quantity_order}</td>
							<td>{item.price_at_purchase * item.quantity_order}</td>
							<td>
								<IconButton
									onClick={(e) => handleDelete(e, item.product_id)}
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
