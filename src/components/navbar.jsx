import { MessageCircleMore, LogOut } from "lucide-react";
import IconButton from "./icon_button.jsx";
import { useContext, useState } from "react";
import { Context } from "./context.jsx";
import { useLocation } from "react-router";

export default function Navbar() {
  const { loggedInUser } = useContext(Context);

  const location = useLocation().pathname;
  const [buttons, setButtons] = useState({
    profile: location === "/dashboard/profile",
    chats: location.includes("chats"),
    logout: location === "/",
  });
  const icons = [
    <img
      src={loggedInUser.photo}
      className="w-15 h-15 object-cover rounded-full"
    />,
    <MessageCircleMore size="30" />,
    <LogOut size="30" />,
  ];

  return (
    <div className="flex flex-row sm:flex-col w-full sm:w-25 justify-between items-center order-1 sm:order-0 bg-[#35244d]">
      <div className="sm:w-full flex-2 sm:flex-0 flex sm:block justify-between">
        {Object.entries(buttons).map((pair, index) => (
          <IconButton
            key={pair[0]}
            link={pair[0] === "logout" ? "/" : pair[0]}
            buttons={buttons}
            setButtons={setButtons}
          >
            {icons[index]}
          </IconButton>
        ))}
      </div>
    </div>
  );
}
