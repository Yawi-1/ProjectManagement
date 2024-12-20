import React, { useEffect, useState } from 'react';
import './AllAdmins.css';
import { useProject } from '../../context/ProjectContext';
import DeleteModal from '../Modal/DeleteModal'
import Loader from '../../components/Loader/Loader';
const AllAdmins = ({ setAddAdmin }) => {

    const { admins,isLoading } = useProject();
    const [isDelete, setIsDelete] = useState(false);
    const [admin, setAdmin] = useState('');

    return (
        <div className="alladmins-container">
            <h2>All Admins</h2>
            {isDelete && <DeleteModal setIsDelete={setIsDelete} userData={admin} suburl='admins' />}
            { isLoading && <Loader/>}
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
                            <button onClick={() => { setIsDelete(true), setAdmin(admin) }}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
            <button onClick={() => setAddAdmin(true)} id='addAdminBtn'>Add Admin</button>
        </div>
    );
};

export default AllAdmins;
