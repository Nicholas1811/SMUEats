import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import '@mantine/core/styles.css';
import { createTheme, MantineProvider } from '@mantine/core';
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom';
import Homepage from './frontend/Homepage';
import Store from './frontend/Store';
import Login from './frontend/Login';
import Signup from './frontend/Signup';
import Profile from './frontend/Profile';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { Notifications } from '@mantine/notifications';
import Order from './frontend/Order';
import { PreviousOrder } from './frontend/PreviousOrder';

//since this is your app's starting point, you will be able to use the variables here for the whole application.
const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage/>
  },
  {
    path: "/store/:id",
    element: <Store/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/signup/",
    element: <Signup/>
  },
  {
    path: '/profile',
    element: <Profile/>
  },
    {
    path: '/Orders',
    element: <Order/>
  },
  {
    path: '/Orders/:pass',
    element: <Order/>
  },
  {
    path: '/Orders/:fail',
    element: <Order/>
  },
    {
    path: '/prevOrder',
    element: <PreviousOrder/>
  }

])
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const theme = createTheme({
  breakpoints: {
    cus: "787px",
    xs: '30em',
    custom: '37.5em',
    sm: '48em',
    md: '64em',
    lg: '74em',
    xl: '90em',
  },
});
root.render(
  <MantineProvider theme={theme}>
    <Notifications/>
    {/* <React.StrictMode> */}
          
        <RouterProvider router={router}>
          
        </RouterProvider>
    {/* </React.StrictMode> */}
  </MantineProvider>

);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
