import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { addProductToOrder, getAllProducts, getAllProductsOnOrder } from '../axios-services';


const Products = (props) => {
	const [products, setProducts] = useState([]);
	const category = props.category;
	const cart = props.cart;
	const setCart = props.setCart;

	const order = props.order;

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

		let currItem = products[e.target.id];

		const addProductFunc = async () => {
			const addProduct = await addProductToOrder(currItem, order);
		}
		addProductFunc();

		const setProductsToCart = async () => {
			const products = await getAllProductsOnOrder(order.id);
			setCart(products[0]);
		}
		setProductsToCart();
	};

	return (
		<div>
			<ul className='product-list'>
				{products.map((product, index) => {
					return (
						<li id={product.id} key={product.id}>
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
									id={index}
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
