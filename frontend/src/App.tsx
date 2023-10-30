import './styles/App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorPage from './routes/errorPage.tsx';
import ProfilePage from './routes/profilePage.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProfilePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/callback",
    element: <ProfilePage />,
    errorElement: <ErrorPage />,
  },
]);


export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}
