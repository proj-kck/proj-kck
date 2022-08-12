import React, { useEffect } from 'react';
import { useState } from 'react';

import { useParams } from 'react-router-dom';
import { getProductById } from '../axios-services';

const SingleProductView = () => {
	const { id } = useParams();
	const [product, setProduct] = useState({});

	useEffect(() => {
		async function getData() {
			const data = await getProductById(id);
			setProduct(data);
		}
		getData();
	}, []);
	console.log(product);
	return (
		<div>
			<img src={product.img} alt={product.name} />
			<div>
				<h2>
					{product.name} ${product.price}
				</h2>
				<h3>{product.description}</h3>
			</div>
		</div>
	);
};

export default SingleProductView;
