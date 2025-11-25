import { createRoot } from 'react-dom/client'
import './index.css'
import Router from './ecommerce/pages/Router'
// import App from './App'

createRoot(document.getElementById('root')).render(
  <Router />
  // <App />
)
