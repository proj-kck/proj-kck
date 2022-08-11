import React from 'react';

const Home = () => {
	return (
		<div>
			<a href='/'>
				<div className='section-container'>
					<h1>Wine</h1>
				</div>
			</a>
			<div className='section-container'>
				<h1>Liquor</h1>
			</div>
			<div className='section-container'>
				<h1>Beer</h1>
			</div>
		</div>
	);
};

export default Home;
