import { Outlet } from "react-router";
import { Context } from "./context.jsx";
import { useContext, useState } from "react";
import IconButton from "./icon_button.jsx";

export default function Chats() {
  const { users, loggedInUser } = useContext(Context);
  const [buttons, setButtons] = useState(
    users.map((user) => {
      return { [user.id]: false };
    }),
  );

  return (
    <div className="flex flex-1 flex-col sm:flex-row">
      <div className="w-full sm:w-75 h-25 sm:h-full overflow-scroll bg-[#402e58] outline outline-l outline-white/10 text-white">
        <ul className="mt-0 sm:mt-8 flex flex-col">
          {users
            .filter((user) => user.id !== loggedInUser.id)
            .map((user) => (
              <li key={user.id}>
                <IconButton
                  link={user.id}
                  buttons={buttons}
                  setButtons={setButtons}
                >
                  <img
                    src={user.photo}
                    className="w-17 h-17 object-cover rounded-full"
                  />
                  <div className="font-bold flex-1">{`${user.firstName} ${user.lastName}`}</div>
                </IconButton>
              </li>
            ))}
        </ul>
      </div>
      <div className="flex flex-col flex-1 lg:flex-row max-h-screen">
        <Outlet />
      </div>
    </div>
  );
}
