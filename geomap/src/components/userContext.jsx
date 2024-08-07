import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        job: '',
        profilePicture: '',
        municipality: ''
    });

    const updateUser = (userData) => {
        setUser(userData);
    };
    // const updateUserProfileImage = (imageUrl) => {
    //     setUser(prevUser => ({
    //         ...prevUser,
    //         profilePicture: imageUrl
    //     }));
    // };

    return (
        <UserContext.Provider value={{ user, updateUser  }}>
            {children}
        </UserContext.Provider>
    );
};
