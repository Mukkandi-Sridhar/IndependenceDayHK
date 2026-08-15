import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import App from './App.jsx'
import AdminPage from './components/AdminPage.jsx'

// Hidden /admin route — not linked anywhere in the public app
const isAdmin = window.location.pathname === '/admin';

createRoot(document.getElementById('root')).render(
  isAdmin ? <AdminPage /> : <App />
)
