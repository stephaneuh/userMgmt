import React, { useState, useEffect } from 'react';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = async () => {
        try {
            const apiUrl = 'http://YOUR_IP_ADDRESS:YOUR_PORT/users';
            const response = await fetch(`${apiUrl}?search=${searchTerm}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Error fetching users');
            }
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        handleSearch();
    }, []);

    return (
        <div>
            <h1>User List</h1>
            {users.length === 0 ? (
                <p>No results returned.</p>
            ) : (
                <ul>
                    {users.map((user) => (
                        <li key={user.id}>{user.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UserList;
