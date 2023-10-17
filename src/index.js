import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css'
import '../node_modules/@fortawesome/fontawesome-free/js/all.min'
import { QueryClient, QueryClientProvider } from 'react-query'
import UserContextProvider from './Context/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
let queryClient = new QueryClient();

root.render(
    <QueryClientProvider client={queryClient}>
        <UserContextProvider>
            <App />
        </UserContextProvider>
    </QueryClientProvider>
);