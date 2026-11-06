import React from 'react'
import { createRoot } from 'react-dom/client'
// fonty z paczek npm (bez Google Fonts) – działają offline i w aplikacji desktopowej
import '@fontsource-variable/manrope/wght.css'
import '@fontsource-variable/jetbrains-mono/wght.css'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
