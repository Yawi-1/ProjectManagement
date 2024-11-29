import React, { useEffect, useState } from 'react';
import './AllAdmins.css';
import { useProject } from '../../context/ProjectContext';
import axios from 'axios';

const AllAdmins = ({setAddAdmin}) => {
    const [admins,setAdmins] = useState([]);
    const {url} = useProject();

     const fetchAdmins  = async()=>{
        try{
             const response = await axios.get(`${url}/admins`);
             console.log(response);
             setAdmins(response.data);
        }
        catch(error){
              if(error.response || error.response.data){
                alert(error.response.data.message);
              }
              else{
                alert("Something went wrong.");
              }
        }
     }

     useEffect(()=>{
        fetchAdmins();
     },[url])
    return (
        <div className="alladmins-container">
            <h2>All Admins</h2>
            {admins.length === 0 ? (
                <p>No admins to display.</p>
            ) : (
                <ul>
                    {admins.map((admin) => (
                        <li key={admin.id}>
                            <div>
                                <strong>Name:</strong> {admin.name} <br />
                                <strong>Email:</strong> {admin.email}
                            </div>
                            <button >Delete</button>
                        </li>
                    ))}
                </ul>
            )}
            <button  onClick={()=>setAddAdmin(true)} id='addAdminBtn'>Add Admin</button>
        </div>
    );
};

export default AllAdmins;
