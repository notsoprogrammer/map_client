import axios from 'axios';

export const validateToken = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return false;
  }

  try {
    await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/validate-token`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return true;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token'); 
      return false;
    }
    console.error('Error validating token:', error);
    return false;
  }
};
