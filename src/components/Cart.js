import React, { useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { ConstructionOutlined } from '@mui/icons-material';

const Cart = (props) => {
	const cart = props.cart;
	const setCart = props.setCart;
	const [rows, setRows] = useState([]);
	const handleDelete = (e) => {
		setCart(
			cart.filter((item) => {
				console.log(item);
				console.log(item.id);
				console.log(e.target.parentNode.parentNode.parentNode.id);
				let bool =
					item.id != e.target.parentNode.parentNode.parentNode.id;
				console.log(bool);
				return item.id != e.target.parentNode.parentNode.parentNode.id;
			})
		);
	};
	useEffect(() => {});

	return (
		<div className='cart-area'>
			<h2>Cart</h2>
			<table>
				<tr>
					<th>Item</th>
					<th>Quantity</th>
					<th>Price</th>
				</tr>
				{cart.map((value) => {
					return (
						<tr key={value.name} id={value.id}>
							<td>{value.name}</td>
							<td>{value.quantity}</td>
							<td>{value.price * value.quantity}</td>
							<td>
								<IconButton onClick={handleDelete}>
									<DeleteIcon></DeleteIcon>
								</IconButton>
							</td>
						</tr>
					);
				})}
			</table>
		</div>
	);
};

export default Cart;
