import {createBrowserRouter, Navigate} from "react-router-dom";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Login from "./views/Login";
import NotFound from "./views/NotFound";
import Signup from "./views/Signup";
import DbDataTable from "./views/DbDataTable";
import DbDataForm from "./views/DbDataForm";
import Users from "./views/Users";
import UserForm from "./views/UserForm";
import TYPE from './enums/type';
import ACTIONS from './enums/actions';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout/>,
    children: [
      {
        path: '/',
        element: <Navigate to="/mechanicy"/>
      },
      {
        path: '/mechanicy',
        element: <DbDataTable type={TYPE.MECHANICS}/>
      },
      {
        path: 'mechanicy/:id',
        element: <DbDataForm key={ACTIONS.UPDATE} type={TYPE.MECHANICS}/>
      },
      {
        path: 'mechanicy/new',
        element: <DbDataForm key={ACTIONS.CREATE} type={TYPE.MECHANICS}/>
      },
      {
        path: '/oferty',
        element: <DbDataTable type={TYPE.OFFERS}/>
      },
      {
        path: 'oferty/:id',
        element: <DbDataForm key={ACTIONS.UPDATE} type={TYPE.OFFERS}/>
      },
      {
        path: 'oferty/new',
        element: <DbDataForm key={ACTIONS.CREATE} type={TYPE.OFFERS}/>
      },
      {
        path: '/zlecenia',
        element: <DbDataTable type={TYPE.ORDERS}/>
      },
      {
        path: 'zlecenia/:id',
        element: <DbDataForm key={ACTIONS.UPDATE} type={TYPE.ORDERS}/>
      },
      {
        path: 'zlecenia/new',
        element: <DbDataForm key={ACTIONS.CREATE} type={TYPE.ORDERS}/>
      },
    ]
  },
  {
    path: '/',
    element: <GuestLayout/>,
    children: [
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/signup',
        element: <Signup/>
      }
    ]
  },
  {
    path: "*",
    element: <NotFound/>
  }
])

export default router;
