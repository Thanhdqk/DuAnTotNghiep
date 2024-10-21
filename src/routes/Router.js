import { lazy } from "react";
import { Navigate } from "react-router-dom";
import Loadable from "../layouts/full/shared/loadable/Loadable";
import Kho from "../views/quanly/Quanlykho";
import Newlogin from "../views/quanly/Newlogin";
import PrivateRoute from "./private/PrivateRoute";
import Sanpham from "../views/quanly/QuanlySP";
import Voucher from "../views/quanly/QuanlyVoucher";

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import("../layouts/full/FullLayout")));
const BlankLayout = Loadable(
  lazy(() => import("../layouts/blank/BlankLayout"))
);

/* ****Pages***** */
const Dashboard = Loadable(lazy(() => import("../views/dashboard/Dashboard")));
const SamplePage = Loadable(
  lazy(() => import("../views/sample-page/SamplePage"))
);
const Icons = Loadable(lazy(() => import("../views/icons/Icons")));
const TypographyPage = Loadable(
  lazy(() => import("../views/utilities/TypographyPage"))
);
const Shadow = Loadable(lazy(() => import("../views/utilities/Shadow")));
// const Error = Loadable(lazy(() => import('../views/authentication/Error')));
// const Register = Loadable(lazy(() => import('../views/authentication/Register')));
// const Login = Loadable(lazy(() => import('../views/authentication/Login')));

const Router = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/dashboard" /> },
      //{ path: "/dashboard", exact: true, element: <Dashboard /> },
      {
        path: "/dashboard",
        exact: true,
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      { path: "/kho", exact: true, element: <Kho /> },
      { path: "/sanpham", exact: true, element: <Sanpham /> },
      { path: "/voucher", exact: true, element: <Voucher /> },
      { path: "/sample-page", exact: true, element: <SamplePage /> },
      { path: "/icons", exact: true, element: <Icons /> },
      { path: "/ui/typography", exact: true, element: <TypographyPage /> },
      { path: "/ui/shadow", exact: true, element: <Shadow /> },
      { path: "*", element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: "/auth",
    element: <BlankLayout />,
    children: [
      // { path: '404', element: <Error /> },
      // { path: '/auth/register', element: <Register /> },
      //{ path: '/login', element: <Newlogin /> },
      { path: "*", element: <Navigate to="/auth/404" /> },
    ],
  },
  { path: "/login", element: <Newlogin /> },
];

export default Router;
