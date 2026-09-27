import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col gap-2 justify-center items-center">
      <div className="font-bold text-5xl">404</div>
      <div className="text-[#646464] font-bold text-xl">
        The Page You're Looking For Doesn't Exist, bitch.
      </div>
      <Link to="/" className="bg-black text-white px-6 py-1 font-bold">
        GO HOME
      </Link>
    </div>
  );
}
