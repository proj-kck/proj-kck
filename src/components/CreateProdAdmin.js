import React, {useState} from 'react'

const CreatingProd = () => {
    const [name, setName] = useState(''); 
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [img, setImg] = useState('');
    const [stock, setStock] = useState('');

    const submitHandler = async (evt) => {
        evt.preventDefault();
        try {
            // let response = await ();

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
        <h3>Create a product:</h3>
            <form onSubmit={submitHandler}>
                <input type="text" placeholder="name" value={name} onChange= {(evt) => setName(evt.target.value)}></input>
                <input type="text" placeholder="description" value={description} onChange={(evt) => setDescription(evt.target.value)}></input>
                <input type="text" placeholder="price" value={price} onChange={(evt) => setPrice(evt.target.value)}></input>
                <input type="text" placeholder="category" value={category} onChange={(evt) => setCategory(evt.target.value)}></input>
                <input type="text" placeholder="image url" value={img} onChange={(evt) => setImg(evt.target.value)}></input>
                <input type="text" placeholder="stock/quantity" value={stock} onChange={(evt) => setStock(evt.target.value)}></input>              
                <button type="submit" className="btn-outline-primary">Create</button>
            </form>
        </div>
    )
}
export default CreatingProd;
