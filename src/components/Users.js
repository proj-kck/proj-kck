import React, {useState, useEffect} from "react";
import {getAllUsers} from "../axios-services";


const Users = (props) => {
    const [users, setUsers] = useState([]);

    const token = props.token;

    useEffect(() => {
        console.log(token, "okokok");
        async function getUsers() {
            const data = await getAllUsers(token);
            console.log(data);
            setUsers(data);
          }
          getUsers();
    }, []);
    
    return (
        <div>
            <table>
                <tr>
					<th>Username</th>
					<th>Email</th>
					<th>Is Admin?</th>
				</tr>
                {users.map((user)=> {
                return(
                    <tr key={user.username} id={user.id} >
							<td>{user.username}</td>
							<td>{user.email}</td>
							<td>{user.is_admin}</td>
					</tr>
                )
                }
                )}
            </table>
        </div>


    )
}
export default Users;