import "./styles/index.css"
import "./styles/App.css"
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { UserProvider } from "./contexts/userContext.jsx"

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
import ResetPasswordPage from './pages/ResetPasswordPage.jsx'
import MissionEditionPage from './pages/MissionEditionPage.jsx'
import NotFoundPage from "./pages/NotFoundPage.jsx"
import ProfileEditionPage from "./pages/ProfileEditionPage.jsx"
import MissionByUserPage from "./pages/MissionByUserPage.jsx"
import ApplicantPage from "./pages/VolunteerPage.jsx"

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
        element: <ForgotPasswordPage />
      },
      {
        path: '/reset-password',
        element: <ResetPasswordPage />
      },
      {
        path: '/contact',
        element: <ContactPage />
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
        path: '/mission/:missionId/edition',
        element: <MissionEditionPage />
      },
      {
        path: '/mission/:missionId/applicants',
        element: <ApplicantPage />
      },
      {
        path: '/user/:userId',
        element: <ProfilePage />
      },
      {
        path: '/user/edition',
        element: <ProfileEditionPage />
      },
      {
        path: '/user/:userId/mission',
        element: <MissionByUserPage />
      },
      {
        path: '/403',
        element: <UnauthorizedPage />
      },
      {
        path: '*',
        element: <NotFoundPage />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserProvider>
    <RouterProvider router={router} />
  </UserProvider>
)
