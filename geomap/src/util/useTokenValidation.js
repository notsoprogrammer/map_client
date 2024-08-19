import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearCredentials } from '../slices/authSlice';
import { useLogoutMutation } from '../slices/usersApiSlice';
import axios from 'axios';

const useTokenValidation = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                throw new Error('Token not found');
            }

            await logoutApiCall().unwrap();

            localStorage.removeItem('token');
            dispatch(clearCredentials());

            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    useEffect(() => {
        const validateToken = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                logoutHandler();
                return;
            }

            try {
                await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/validate-token`, {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true
                });
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    logoutHandler();
                }
            }
        };

        validateToken();
    }, []);
};

export default useTokenValidation;
