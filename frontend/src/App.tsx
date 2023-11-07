import './styles/App.css'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorPage from './routes/errorPage.tsx';
import ProfilePage from './routes/profilePage.tsx';
import Authenticator from './components/Authenticator.tsx';
import { useState } from 'react';

function Root() {
  return (
    <>
    Let's freaking go dude
      <Outlet />
    </>
  );
}


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/callback",
        element: <ProfilePage />,
        errorElement: <ErrorPage />,
      },
    ]
  }
]);


export default function App() {
  return (
    <>
      <Authenticator>
        <RouterProvider router={router} />
      </Authenticator>
    </>
  )
}
