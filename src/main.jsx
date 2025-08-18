import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter as  Router } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // 👈 este es el importante
import App from './App'
//import './index.css'
import { AuthProvider } from './components/Context/AuthContext'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <Router>
    <React.StrictMode>
      
        <App />
      
      </React.StrictMode>
    </Router>
  </AuthProvider>
)