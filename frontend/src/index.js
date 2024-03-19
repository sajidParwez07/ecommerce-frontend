import ReactDOM from 'react-dom/client';
import './index.css';
import './icon/css/all.css'
import 'bootstrap/dist/css/bootstrap.css'
import UserApp from './App.js';
import AdminApp from './adminapp.js';
import reportWebVitals from './reportWebVitals';
import React, { useEffect } from 'react';


const root = ReactDOM.createRoot(document.getElementById('root'));
const user = JSON.parse(localStorage.getItem("user"))
if(user?.isAdmin){        // localStorage.getItem to fecth from storage

root.render( 
    <AdminApp/>
);
    
}else{
    root.render(
        <UserApp/>
    );
}
reportWebVitals();
