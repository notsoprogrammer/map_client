import { About, Contact, RiceStat, Dashboard, Farmers, MapUploads, Maps, PrivateRoute, Crops } from './components/index'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import App from './App.jsx'
import Associations from './components/Associations'
import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom/client'
import store from './store'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/about' element={<About />} />
        {/* Private Routes */}
        <Route path='' element={<PrivateRoute/>}>
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/farmers' element={<Farmers/>} />
          <Route path='/associations' element={<Associations/>} />
          <Route path='/crops' element={<Crops/>} />
          <Route path='/rice' element={<RiceStat/>} />
          <Route path='/maps' element={<Maps/>} />
          <Route path='/mapuploads' element={<MapUploads/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>,
)
