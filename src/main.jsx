import { BrowserRouter } from "react-router-dom";
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css'
import App from './App.jsx'
import AuthContext from "./context/AuthContext.jsx";
import UserContext from "./context/UserContext.jsx";

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <GoogleOAuthProvider clientId="224162323076-usn7tocrqpc49qlkmlj2ahl8t4vnhr65.apps.googleusercontent.com">
    <App />
    </GoogleOAuthProvider>
  </BrowserRouter>,
)
