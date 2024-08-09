import React, { useEffect } from 'react';
import { useUser } from './userContext';
import { useNavigate } from 'react-router-dom';

const UserDataInitializer = ({ children }) => {
  const { user, updateUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {  // Fetch user data if not available
      const fetchUserData = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/profile`, {
            headers: {
              'Cache-Control': 'no-cache'  // Avoid using cached data
            }
          });
          const data = await response.json();
          if (response.ok) {
            updateUser(data);
          } else {
            throw new Error('Failed to fetch user data');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          navigate('/');  // Redirect to login on failure
        }
      };
      fetchUserData();
    }
  }, [user, updateUser, navigate]);

  return <>{children}</>;
};

export default UserDataInitializer;
