import React, { useState } from 'react';
import UserList from './components/UserList';
import UserForm from './components/UserForm';

function App() {
    const [users, setUsers] = useState([]);

    const handleSearch = async (searchTerm) => {
        try {
            const response = await fetch(`/users?search=${searchTerm}`);
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
