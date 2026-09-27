import { useEffect, useState } from "react";

export default function Dashboard() {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/users", {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((response) => setIsAuth(response.ok ? true : false))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!isAuth)
    return <div>You need to log in to view this resource, bitch.</div>;
  return <div>authenicated</div>;
}
