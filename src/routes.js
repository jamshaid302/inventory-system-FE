import { lazy } from "react";

const Home = lazy(() => import("./pages/home"));
const LoginPage = lazy(() => import("./pages/login"));
const SignupPage = lazy(() => import("./pages/signup"));
const Error404 = lazy(() => import("./pages/404"));

const routes = [
  {
    path: "/",
    element: Home,
  },
  {
    path: "/login",
    element: LoginPage,
  },
  {
    path: "/*",
    element: Error404,
  },
];

export default routes;
