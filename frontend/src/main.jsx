import React from 'react';
import ReactDOM from 'react-dom/client';
import "./styles/index.css";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


import App from './App.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import HomePage from './pages/HomePage.jsx';
import MissionSearchPage from './pages/MissionSearchPage.jsx';
import MissionCreationPage from './pages/MissionCreationPage.jsx';
import MissionPage from './pages/MissionPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import UnauthorizedPage from './pages/UnauthorizedPage.jsx';

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
        element: <RegisterPage />
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
