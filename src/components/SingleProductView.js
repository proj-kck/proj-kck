import React, { useEffect } from 'react';
import { Button } from '@mui/material';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../axios-services';
import './SingleProductPage.css';

const SingleProductView = () => {
	let navigate = useNavigate();
	const { id } = useParams();
	const [product, setProduct] = useState({});

	useEffect(() => {
		async function getData() {
			const data = await getProductById(id);
			setProduct(data);
			if (!data.id) {
				navigate(-1);
			}
		}
		getData();
	}, []);

	return (
		<div id='single-product'>
			<img src={product.img} alt={product.name} />
			<div className='product-info'>
				<h2>
					{product.name} ${product.price}
				</h2>
				<h3>{product.description}</h3>
				<Button variant='contained'>Add to cart</Button>
			</div>
		</div>
	);
};

export default SingleProductView;
