import { createBrowserRouter } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import PrivateLayout from '../layouts/PrivateLayout';
import { Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Overview from '../pages/Overview/Overview';
import Starship from '../pages/Starship/Starship';
import People from '../pages/People/People';
import Species from '../pages/Species/Species';
import OverviewDetails from '../pages/Overview/OverviewDetails';
import StarshipDetails from '../pages/Starship/StarshipDetails';
import PeopleDetails from '../pages/People/PeopleDetails';
import SpeciesDetails from '../pages/Species/SpeciesDetails';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        index: true, // default route
        element: <Navigate to="/login" replace />,
      },
      {
        path: 'login',
        element: <Login />,
      },
    ],
  },

  {
    path: '/overview',
    element: <PrivateLayout />,
    children: [
      {
        index: true,
        element: <Overview />,
      },
      {
        path: '/overview/:id',
        index: false,
        element: <OverviewDetails />,
      },
    ],
  },

  {
    path: '/starships',
    element: <PrivateLayout />,
    children: [
      {
        index: true,
        element: <Starship />,
      },
      {
        path: '/starships/:id',
        index: false,
        element: <StarshipDetails />,
      },
    ],
  },

  {
    path: '/people',
    element: <PrivateLayout />,
    children: [
      {
        index: true,
        element: <People />,
      },
      {
        path: '/people/:id',
        index: false,
        element: <PeopleDetails />,
      },
    ],
  },

  {
    path: '/species',
    element: <PrivateLayout />,
    children: [
      {
        index: true,
        element: <Species />,
      },
      {
        path: '/species/:id',
        index: false,
        element: <SpeciesDetails />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
