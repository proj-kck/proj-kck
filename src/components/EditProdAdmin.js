import React, {useEffect} from "react";
import {beers, wines, spirits} from './seedData';
// import {getAllProducts} from "../axios-services";

const EditProd = () => {
    
    useEffect(() => {
        async function getProducts() {
            const data = await fetch /*getAllProducts*/();
          }
          getProducts();
    }, []);
}
export default EditProd;