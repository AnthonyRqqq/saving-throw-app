import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css'

import App from './App.jsx';
import Login from './pages/Login';
import Signup from './pages/Signup';
import WeatherSearch from './pages/WeatherSearch';
import WeatherDisplay from './pages/WeatherDisplay.jsx';
import Spells from './components/Spells/Spells.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/weather/create',
        element: <WeatherSearch />,
      },
      {
        path: '/weather/display',
        element: <WeatherDisplay />
      },
      {
        path: '/spells',
        element: <Spells />
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
