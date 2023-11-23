import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import SiteRatingContextProvider from './contexts/SiteRatingContext'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SiteRatingContextProvider>
      <App />
    </SiteRatingContextProvider>
  </React.StrictMode>
)
