import React from 'react';

const Cart = (props) => {
	const cart = props.cart;
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
						<tr>
							<td>{value.name}</td>
							<td>{value.quantity}</td>
							<td>{value.price * value.quantity}</td>
						</tr>
					);
				})}
			</table>
		</div>
	);
};

export default Cart;
