import React, { useState } from 'react';
import UserList from './components/UserList';
import UserForm from './components/UserForm';

function App() {
    const [users, setUsers] = useState([]);

    const handleSearch = async (searchTerm) => {
        try {
            const apiUrl = 'http://YOUR_IP_ADDRESS:YOUR_PORT/users'; // Replace with your IP address and port
            const response = await fetch(`${apiUrl}?search=${searchTerm}`);
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container">
            <h1>User Management</h1>
            <UserForm handleSearch={handleSearch} />
            <UserList users={users} />
        </div>
    );
}

export default App;
