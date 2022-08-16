import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { getAllProducts } from '../axios-services';

const Products = (props) => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		async function getData() {
			const category = props.category;
			const data = await getAllProducts(category);
			setProducts(data);
		}
		getData();
	});
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

	return (
		<div>
			<ul className='product-list'>
				{products.map((product, index) => {
					return (
						<li id={index}>
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
