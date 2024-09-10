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
import MissionSearchPage from './pages/MissionSearchPage.jsx'
import MissionCreationPage from './pages/MissionCreationPage.jsx'
import MissionPage from './pages/MissionPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import UnauthorizedPage from './pages/UnauthorizedPage.jsx'
import ResetPasswordPage from "./pages/ResetPasswordPage.jsx"

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
        path: '/reset-password',
        element: <ResetPasswordPage/>
      },
      {
        path: '/contact',
        element: <ContactPage/>
      },
      {
        path: '/mission',
        element: <MissionSearchPage />
      },
      {
        path: 'mission/creation',
        element: <MissionCreationPage />
      },
      {
        path: '/mission/:missionId',
        element: <MissionPage />
      },
      {
        path: '/user/:userId',
        element: <ProfilePage />
      },
      {
        path: '/403',
        element: <UnauthorizedPage />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
