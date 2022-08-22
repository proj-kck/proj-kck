import React, {useState, useEffect} from "react";
import Products from './Products';

const EditProd = () => {
    const [name, setName] = useState(''); 
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [img, setImg] = useState('');
    const [stock, setStock] = useState('');
    
    useEffect(() => {
        async function getProducts() {
            const data = await fetch /*getAllProducts*/('');
          }
          getProducts();
    }, []);

    const submitHandler = async (evt) => {
        evt.preventDefault();
        try {
            const response = await fetch('./Products.js', {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    product: {
                        name: name,
                        description: description,
                        price: price,
                        category: category,
                        img: img,
                        stock: stock
                    }
                })
            })
            const data = await response.json(); 
            console.log(data); 
            setName('');
            setDescription('');
            setPrice('');
            setCategory('');
            setImg('');
            setStock('');
        } catch (error) {}
    };

    return (
        <div>
        <h1 style={{textAlign: 'center', color: 'black'}}>Edit a product</h1>
            <Products edit={true}/>
        </div>
    )
}
export default EditProd;