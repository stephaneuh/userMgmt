import React, { useState } from 'react';
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

    return (
        <div>
            <UserForm handleSearch={handleSearch} />
            <UserList users={users} loading={loading} />
        </div>
    );
};

export default App;
