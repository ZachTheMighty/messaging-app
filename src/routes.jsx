import App from "./App.jsx";
import SignUp from "./components/sign_up.jsx";
import Login from "./components/log_in.jsx";
import Dashboard from "./components/dashboard.jsx";
import Chats from "./components/chats.jsx";
import Chat from "./components/chat.jsx";
import Profile from "./components/profile.jsx";
import NotFound from "./components/not_found.jsx";

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
        path: "sign-up",
        element: <SignUp />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        children: [
          {
            path: "chats",
            element: <Chats />,
            children: [
              {
                path: ":userId",
                element: <Chat />,
              },
            ],
          },
          {
            path: "profile",
            element: <Profile />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
