import React, { useState, useEffect } from 'react';
import UserList from './UserList';
import UserForm from './UserForm';

const App = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (searchTerm) => {
        try {
            setLoading(true);

            const apiUrl = `http://YOUR_IP_ADDRESS:YOUR_PORT/users?search=${searchTerm}`;
            const response = await fetch(apiUrl, {
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
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Perform a default search when the component mounts
        const defaultSearchTerm = 'default';
        handleSearch(defaultSearchTerm);
    }, []); // Empty dependency array to trigger the effect only once

    return (
        <div>
            <UserForm handleSearch={handleSearch} />
            <UserList users={users} loading={loading} />
        </div>
    );
};

export default App;
