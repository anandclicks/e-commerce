import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ProductContextProvider } from '../context/productContext.jsx'
import { AdminDashbordContextProvider } from '../context/AdminDahbord.jsx'
import { CustomerContetProvider } from '../context/customerContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <CustomerContetProvider>
    <AdminDashbordContextProvider>
    <ProductContextProvider>
    <App />
    </ProductContextProvider>
    </AdminDashbordContextProvider>
    </CustomerContetProvider>
    </BrowserRouter>
  </StrictMode>,
)
