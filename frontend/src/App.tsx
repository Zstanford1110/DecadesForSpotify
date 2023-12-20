import './styles/App.css'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorPage from './routes/errorPage.tsx';
import ProfilePage from './routes/profilePage.tsx';
import HomePage from './routes/homePage.tsx';
import LoginPage from './routes/loginPage.tsx';
import PrivateRoutes from './components/PrivateRoutes.tsx';
import { AuthProvider } from './components/AuthProvider.tsx';
import Authenticator from './components/Authenticator.tsx';

function Layout() {
  return (
    <>
      Let's freaking go dude
      <Outlet />
    </>
  );
}

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <LoginPage />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/auth",
      element: <Authenticator />,
      errorElement: <ErrorPage />,
    },
    {
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          children: [
            {
              path: "/",
              element: <PrivateRoutes />,
              errorElement: <ErrorPage />,
              children: [
                {
                  path: "/profile",
                  element: <ProfilePage />,
                  errorElement: <ErrorPage />,
                },
                {
                  path: "/home",
                  element: <HomePage />,
                  errorElement: <ErrorPage />,
                }
              ]
            },
          ]
        },
      ]
    }
  ]);


  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  )
}
