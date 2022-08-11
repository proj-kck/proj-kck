import React from 'react';
import { Button } from '@mui/material';

const products = [
	{
		name: 'Gin',
		price: 19.99,
		img: 'https://cdn.shoplightspeed.com/shops/643741/files/44756327/1500x4000x3/spirit-dry-gin-7-750ml.jpg',
	},
	{
		name: 'Whiskey',
		price: 29.99,
		img: 'https://img.thewhiskyexchange.com/900/glvob.non11.jpg',
	},
	{
		name: 'Gin',
		price: 19.99,
		img: 'https://cdn.shoplightspeed.com/shops/643741/files/44756327/1500x4000x3/spirit-dry-gin-7-750ml.jpg',
	},
	{
		name: 'Whiskey',
		price: 29.99,
		img: 'https://img.thewhiskyexchange.com/900/glvob.non11.jpg',
	},
	{
		name: 'Gin',
		price: 19.99,
		img: 'https://cdn.shoplightspeed.com/shops/643741/files/44756327/1500x4000x3/spirit-dry-gin-7-750ml.jpg',
	},
	{
		name: 'Whiskey',
		price: 29.99,
		img: 'https://img.thewhiskyexchange.com/900/glvob.non11.jpg',
	},
	{
		name: 'Gin',
		price: 19.99,
		img: 'https://cdn.shoplightspeed.com/shops/643741/files/44756327/1500x4000x3/spirit-dry-gin-7-750ml.jpg',
	},
	{
		name: 'Whiskey',
		price: 29.99,
		img: 'https://img.thewhiskyexchange.com/900/glvob.non11.jpg',
	},
	{
		name: 'Gin',
		price: 19.99,
		img: 'https://cdn.shoplightspeed.com/shops/643741/files/44756327/1500x4000x3/spirit-dry-gin-7-750ml.jpg',
	},
	{
		name: 'Whiskey',
		price: 29.99,
		img: 'https://img.thewhiskyexchange.com/900/glvob.non11.jpg',
	},
	{
		name: 'Gin',
		price: 19.99,
		img: 'https://cdn.shoplightspeed.com/shops/643741/files/44756327/1500x4000x3/spirit-dry-gin-7-750ml.jpg',
	},
	{
		name: 'Whiskey',
		price: 29.99,
		img: 'https://img.thewhiskyexchange.com/900/glvob.non11.jpg',
	},
];

const Products = () => {
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
