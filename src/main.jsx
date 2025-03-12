import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter as  Router } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App'
//import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
  <React.StrictMode>
     <div>
       <App />
     </div>
    </React.StrictMode>
  </Router>
)