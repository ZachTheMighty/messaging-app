import { useNavigate } from "react-router";

export default function IconButton({ children, link, buttons, setButtons }) {
  const navigate = useNavigate();
  const button = link === "/" ? "logout" : link;

  return (
    <button
      onClick={() => {
        if (!buttons[button]) {
          setButtons(
            Object.keys(buttons).reduce(
              (accumulator, currentValue) => ({
                ...accumulator,
                [currentValue]: false,
              }),
              {},
            ),
          );

          setButtons((prevButtons) => {
            return { ...prevButtons, [button]: true };
          });
        }
        navigate(link.toString(), { replace: link === "/" }) && link === "/"
          ? localStorage.removeItem("token")
          : "";
      }}
      className={`w-full h-25 flex-1 flex justify-center items-center ${!Number.isInteger(button) ? "hover:bg-[#402e58] text-[#74628b]" : "hover:bg-[#4b3663] pl-12"} ${buttons[button] && !Number.isInteger(button) && "text-white bg-[#402e58] border-l-6 pr-[6px] border-l-[#6c479f]"} ${Number.isInteger(button) && buttons[button] && "bg-[#4b3663]"}`}
    >
      {children}
    </button>
  );
}
