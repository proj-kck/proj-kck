import React, {useState, useEffect} from "react";
import {/*getAllUsers*/} from "../axios-services";

const Users = (props) => {
    const [theusers, setTheUsers] = useState([]);
    const category = props.category;

    useEffect(() => {
        async function getUsers() {
            const data = await /*getAllUsers*/(category);
            setTheUsers(data);
          }
          getUsers();
    }, [category]);
}
export default Users;