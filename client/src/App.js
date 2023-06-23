import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchUsers = async (page = 1, limit = 10) => {
        try {
            const response = await axios.get(
                `/users?page=${page}&limit=${limit}&search=${encodeURIComponent(searchQuery)}`
            );
            setUsers(response.data);
            setTotalPages(response.headers['x-total-pages']);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching users:', error);
            setError('Error fetching users');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        fetchUsers(page);
    };

    const handleSearch = (event) => {
        event.preventDefault();
        fetchUsers(1);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>User List</h1>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search by name or email"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                />
                <button type="submit">Search</button>
            </form>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        Name: {user.name} | Email: {user.email}
                    </li>
                ))}
            </ul>
            <div>
                {currentPage > 1 && (
                    <button onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
                )}
                Page {currentPage} of {totalPages}
                {currentPage < totalPages && (
                    <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
                )}
            </div>
        </div>
    );
};

export default App;
