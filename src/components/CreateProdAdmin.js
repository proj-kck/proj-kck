import React, {useState} from 'react';
import { TextField, Button, InputLabel, Select, MenuItem } from '@mui/material';
import { createProduct } from '../axios-services';
import { useNavigate } from 'react-router-dom';

const CreatingProd = (props) => {
    const [name, setName] = useState(''); 
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [img, setImg] = useState('');
    const [stock, setStock] = useState('');
    const navigate = useNavigate();
    const token = props.token;

    const submitHandler = async (evt) => {
        evt.preventDefault();
        try {
            createProduct(token, name, description, price, category, img, stock)
            .then(navigate('/admin'))
        } catch (error) {
            throw error;
        }
    };

    return (
        <div>
            <br/>
        <h3 style={{textAlign: 'center'}}>Create a product:</h3>
            <form onSubmit={submitHandler}>
                <TextField
					id='outlined-required'
					label='Name'
					variant='outlined'
					value={name}
					onChange={(evt) => setName(evt.target.value)}
                />
                <br/> 
                <TextField
					id='outlined-required'
					label='Description'
					variant='outlined'
					value={description}
					onChange={(evt) => setDescription(evt.target.value)}
                />
                <br/> 
                <TextField
					id='outlined-required'
					label='Price'
					variant='outlined'
					value={price}
					onChange={(evt) => setPrice(evt.target.value)}
                />
                <br/> 
                <InputLabel id="outlined-required">Category</InputLabel>
                <Select
                    labelId="category-select"
                    id="outline-required"
                    value={category}
                    label="Category"
                    onChange={(evt) => setCategory(evt.target.value)}
                >
                <MenuItem value={'beer'}>Beer</MenuItem>
                <MenuItem value={'wine'}>Wine</MenuItem>
                <MenuItem value={'spirit'}>Spirit</MenuItem>
                </Select>
                <br/> 
                <TextField
					id='outlined-required'
					label='Image Url'
					variant='outlined'
					value={img}
					onChange={(evt) => setImg(evt.target.value)}
                />
                <br/> 
                <TextField
					id='outlined-required'
					label='Stock/Quantity'
					variant='outlined'
					value={stock}
					onChange={(evt) => setStock(evt.target.value)}
                />
                <br/>   
                <Button
					variant='contained'
					onClick={submitHandler}
					type='submit'
					>
						Add Product
					</Button>           
            </form>
        </div>
    )
}
export default CreatingProd;
