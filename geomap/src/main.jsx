import { About, Contact, RiceStat, Dashboard, Farmers, MapUploads, Maps, PrivateRoute, Crops,Settings,Features,Reset, UserManagement } from './components/index'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NotFound from './components/notFound.jsx'
import App from './App.jsx'
import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom/client'
import store from './store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store}>
      <BrowserRouter>
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
      </BrowserRouter>
  </Provider>
  // </React.StrictMode>,
)
