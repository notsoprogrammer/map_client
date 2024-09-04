import { About, Contact, RiceStat, Dashboard, Farmers, MapUploads, Maps, PrivateRoute, Crops, Settings, Features, Reset, UserManagement } from './components/index';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import NotFound from './components/notFound.jsx';
import App from './App.jsx';
import { Provider } from 'react-redux';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import store from './store.js';

const RootComponent = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.addEventListener('message', (event) => {
            if (event.origin === "https://prod-apsoutheast-a.online.tableau.com" && event.data === 'authenticationSuccessful') {
                navigate('/dashboard'); // Redirect to dashboard
            }
        });

        return () => window.removeEventListener('message', this);
    }, [navigate]);

    return (
        <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path='/' element={<App />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/reset-password/:token' element={<Reset/>} />
            {/* Private Routes */}
            <Route path='' element={<PrivateRoute/>}>
                <Route path='/dashboard' element={<Dashboard/>} />
                <Route path='/settings' element={<Settings/>} />
                <Route path='/farmers' element={<Farmers/>} />
                <Route path='/crops' element={<Crops/>} />
                <Route path='/rice' element={<RiceStat/>} />
                <Route path='/maps' element={<Maps/>} />
                <Route path='/admin/usermanagement' element={<UserManagement/>} />
                <Route path='/admin/mapuploads' element={<MapUploads/>} />
            </Route>
        </Routes>
    );
};

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <BrowserRouter>
            <RootComponent />
        </BrowserRouter>
    </Provider>
);
