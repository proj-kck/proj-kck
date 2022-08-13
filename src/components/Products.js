import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { getAllProducts } from '../axios-services';

const Products = () => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		async function getData() {
			const data = await getAllProducts();
			setProducts(data);
		}
		getData();
	}, []);

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
									/>
								</Link>
								<Button variant='contained'>Add to cart</Button>
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
