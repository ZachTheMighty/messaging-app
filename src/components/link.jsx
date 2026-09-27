import { Link } from "react-router";
export default function ({ to, children }) {
  return (
    <Link
      to={to}
      className="text-teal-500 hover:text-teal-600 active:text-teal-500"
    >
      {children}
    </Link>
  );
}
