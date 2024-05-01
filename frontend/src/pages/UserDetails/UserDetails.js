import React from 'react';

const UserDetails = () => {
    const storedData = JSON.parse(localStorage.getItem("userData"));

    return <h1>User: {storedData.userId}</h1>;
};

export default UserDetails;