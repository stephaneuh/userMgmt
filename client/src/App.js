import React, { useState } from 'react';
import UserList from './components/UserList';
import UserForm from './components/UserForm';

function App() {
    const handleSearch = (searchTerm) => {
        // Logic to handle search functionality and API call
        console.log('Search term:', searchTerm);
    };

    return (
        <div className="container">
            <h1>User Management</h1>
            <UserForm handleSearch={handleSearch} />
            <UserList />
        </div>
    );
}

export default App;
