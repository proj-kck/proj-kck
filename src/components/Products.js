import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { getAllProducts } from '../axios-services';

const Products = (props) => {
	const [products, setProducts] = useState([]);
	const category = props.category;
	const [cart, setCart] = [props.cart, props.setCart];
	useEffect(() => {
		async function getData() {
			const data = await getAllProducts(category);
			setProducts(data);
		}
		getData();
	}, [category]);
	const handleMouseEnter = (e) => {
		e.target.parentNode.parentNode.parentNode.className +=
			' hovered-product';
	};
	const handleMouseLeave = (e) => {
		e.target.parentNode.parentNode.parentNode.className = '';
	};
	const handleMouseEnterButton = (e) => {
		e.target.parentNode.parentNode.className += ' hovered-product';
	};
	const handleMouseLeaveButton = (e) => {
		e.target.parentNode.parentNode.className = '';
	};
	const handleAddToCart = (e) => {
		let newCart = [];
		let isInCart = false;
		for (const product of cart) {
			newCart.push(product);
		}
		for (const product of newCart) {
			// eslint-disable-next-line
			if (product.id == e.target.parentNode.parentNode.id) {
				product.quantity++;
				isInCart = true;
			}
		}
		if (isInCart) {
			setCart(newCart);
			return;
		}
		let temp = products[e.target.parentNode.parentNode.id - 1];
		temp.quantity = 1;
		newCart.push(temp);
		setCart(newCart);
	};

	return (
		<div>
			<ul className='product-list'>
				{products.map((product, index) => {
					return (
						<li id={product.id}>
							<div className='product'>
								<Link to={`/products/id/${product.id}`}>
									<img
										src={product.img}
										alt={`${product.name}`}
										height='200px'
										className='product-img'
										onMouseEnter={handleMouseEnter}
										onMouseLeave={handleMouseLeave}
									/>
								</Link>
								<Button
									variant='contained'
									onMouseEnter={handleMouseEnterButton}
									onMouseLeave={handleMouseLeaveButton}
									onClick={handleAddToCart}
								>
									Add to cart
								</Button>
								<h2>${product.price}</h2>
								<h4>{product.name}</h4>
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
};
export default Products;
