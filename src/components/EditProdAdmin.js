import React, {useState, useEffect} from "react";
// import { getAllProducts } from "../axios-services";

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
        <h3>Edit a product:</h3>
            <form onSubmit={submitHandler}>
                <div>Name:</div> 
                <input type="text" placeholder="name" value={name} onChange= {(evt) => setName(evt.target.value)}></input>
                <br/> 
                <div>Description:</div>
                <input type="text" placeholder="description" value={description} onChange={(evt) => setDescription(evt.target.value)}></input>
                <br/> 
                <div>Price:</div>
                <input type="text" placeholder="price" value={price} onChange={(evt) => setPrice(evt.target.value)}></input>
                <br/> 
                <div>Category:</div>
                <input type="text" placeholder="category" value={category} onChange={(evt) => setCategory(evt.target.value)}></input>
                <br/> 
                <div>Image URL:</div>
                <input type="text" placeholder="image url" value={img} onChange={(evt) => setImg(evt.target.value)}></input>
                <br/> 
                <div>Stock:</div>
                <input type="text" placeholder="stock/quantity" value={stock} onChange={(evt) => setStock(evt.target.value)}></input>  
                <br/>
                <br/>            
                <button type="submit" className="btn-outline-primary">Submit Changes</button>
            </form>
        </div>
    )
}
export default EditProd;