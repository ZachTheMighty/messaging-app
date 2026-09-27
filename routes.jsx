import App from "./src/App.jsx";
import SignUp from "./src/components/sign_up.jsx";
import Login from "./src/components/log_in.jsx";
import Dashboard from "./src/components/dashboard.jsx";
import NotFound from "./src/components/not_found.jsx";

export default [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
