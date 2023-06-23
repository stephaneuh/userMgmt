import React, { useState } from 'react';

const UserForm = ({ handleSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSearch(searchTerm);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Search by name or email"
                value={searchTerm}
                onChange={handleChange}
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default UserForm;
