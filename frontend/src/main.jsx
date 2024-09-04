import "./styles/index.css"
import "./styles/App.css"
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import HomePage from './pages/HomePage.jsx'
import RegisterOrgPage from './pages/RegisterOrgPage.jsx'
import RegisterMemberPage from './pages/RegisterMemberPage.jsx'
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx"
import ContactPage from "./pages/ContactPage.jsx"

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/login',
        element: <LoginPage />
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
      {
        path: '/register/org',
        element: <RegisterOrgPage />
      },
      {
        path: '/register/user',
        element: <RegisterMemberPage />
      },
      {
        path: '/forgot-password',
        element: <ForgotPasswordPage/>
      },
      {
        path: '/contact',
        element: <ContactPage/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
