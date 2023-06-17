import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './Router/Router'
import AuthProvider from './Provider/AuthProvider'
import { HelmetProvider } from 'react-helmet-async';
import {
   QueryClient,
   QueryClientProvider,
 } from '@tanstack/react-query'
 const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
   <React.StrictMode>
      <AuthProvider>
         <HelmetProvider>
         <QueryClientProvider client={queryClient}>
         <div>
            <RouterProvider router={router} />
         </div>
         </QueryClientProvider>
         </HelmetProvider>
      </AuthProvider>
   </React.StrictMode>
)
