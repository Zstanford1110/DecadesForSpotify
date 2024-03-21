import './styles/App.css'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/homePage.tsx';
import ErrorPage from './pages/errorPage.tsx';
import LoginPage from './pages/loginPage.tsx';
import ProfilePage from './pages/profilePage.tsx';
import Authenticator from './components/authentication/Authenticator.tsx';
import { authenticateAndRedirect } from './components/authentication/PrivateRouteLoader.tsx';
import { SpotifyDataProvider } from './components/SpotifyDataProvider.tsx';

const Root = () => {
  return (
    <>
      <Outlet />
    </>
  )
}


const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: async () => {
      await authenticateAndRedirect();
      return {};
    },
    children: [
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      }
    ]
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/auth",
    element: <Authenticator />,
    errorElement: <ErrorPage />,
  }
]);


export default function App() {
  return (
    <>
      <SpotifyDataProvider>
        <RouterProvider router={router} />
      </SpotifyDataProvider>
    </>
  )
}
