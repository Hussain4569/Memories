import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider as ProviderPosts} from "./context/postsContext";
import {Provider as ProviderUser} from "./context/userContext";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <ProviderUser>
    <ProviderPosts>
      <App />
    </ProviderPosts>
  </ProviderUser>
    
  </React.StrictMode>
);

