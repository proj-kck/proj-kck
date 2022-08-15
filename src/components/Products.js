import React, { useState, useEffect } from 'react';
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
	}, [])

	return (
		<div>
			<ul className='product-list'>
				{products.map((product, index) => {
					return (
						<li id={index}>
							<div className='product'>
								<img
									src={product.img}
									alt={product.name}
									height='200px'
								/>
								<h2>{product.name}</h2>
								<h3>${product.price}</h3>
								<Button variant='contained'>Add to cart</Button>
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Products;
