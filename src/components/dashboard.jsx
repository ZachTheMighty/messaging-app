import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import Navbar from "./navbar.jsx";
import Link from "./link.jsx";
import { Context } from "./context.jsx";

export default function Dashboard() {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [chats, setChats] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    fetch("https://message-api-264x.onrender.com/users", {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((response) => {
        setIsAuth(response.ok);
        return response.json();
      })
      .then((data) => {
        setLoggedInUser(data.loggedInUser);
        setUsers(data.users);
      })
      .catch((error) => console.error(error));

    fetch("https://message-api-264x.onrender.com/chats", {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((response) => response.json())
      .then((data) => setChats(data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!isAuth)
    return (
      <div>
        You need to <Link to="/">log in</Link> to view this resource, bitch.
      </div>
    );
  return (
    <Context value={{ loggedInUser, setLoggedInUser, users, chats, setChats }}>
      <div className="min-h-screen flex flex-col justify-end sm:justify-start sm:flex-row">
        <Navbar />
        <Outlet />
      </div>
    </Context>
  );
}
