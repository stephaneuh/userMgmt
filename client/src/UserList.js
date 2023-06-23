import React from 'react';

const UserList = ({ users, loading }) => {
    if (loading) {
        return <p>Loading...</p>;
    }

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
