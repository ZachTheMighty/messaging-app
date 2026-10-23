import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "./context.jsx";
import formatTime from "../utils/format_time.js";
import { Trash, Pencil } from "lucide-react";
import { useLongPress } from "@uidotdev/usehooks";

export default function Message({ message, chat, setChat, messagesRef }) {
  const { users, loggedInUser } = useContext(Context);
  const createdByLoggedInUser = message.userId === loggedInUser.id;

  let renderImage =
    chat.messages.at(chat.messages.findIndex((m) => m.id === message.id) - 1)
      .userId !== message.userId;
  if (chat.messages.findIndex((m) => m.id === message.id) === 0)
    renderImage = true;

  const user = users.find((u) => u.id === message.userId);

  const messageRef = useRef(null);
  const contextMenuRef = useRef(null);

  const [messagesDimensions, setMessagesDimensions] = useState({});
  const [flipContextMenu, setFlipContextMenu] = useState({
    x: false,
    y: false,
  });

  const attrs = useLongPress((event) => handleContextMenu(event), {
    threshold: 500,
  });

  useEffect(() => {
    if (message.contextMenu?.show) {
      const contextMenuDiv = contextMenuRef.current.getBoundingClientRect();

      setFlipContextMenu({
        x:
          message.contextMenu?.x + contextMenuDiv.width >
          messagesDimensions.width,
        y:
          messagesDimensions.y + contextMenuDiv.height >
          messagesDimensions.height,
      });
    }
  }, [message.contextMenu?.show, message.contextMenu?.x, messagesDimensions]);

  const handleDeleteMessage = async () => {
    await fetch(
      `https://message-api-264x.onrender.com/chats/${message.chatId}/messages/${message.id}`,
      {
        method: "delete",
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      },
    )
      .then((response) => response.json())
      .then((data) =>
        setChat({
          ...chat,
          messages: chat.messages.filter((m) => m.id !== data.id),
        }),
      );
  };

  const handleContextMenu = async (event) => {
    if (!createdByLoggedInUser) {
      setChat({
        ...chat,
        messages: chat.messages.map((m) => {
          return { ...m, contextMenu: { ...m.contextMenu, show: false } };
        }),
      });
      return;
    }
    setChat((prevChat) => {
      return {
        ...prevChat,
        messages: prevChat.messages.map((m) => {
          return {
            ...m,
            contextMenu: {
              show: m.id === message.id,
              x:
                event.clientX -
                messageRef.current?.getBoundingClientRect().left,
              y:
                event.clientY - messageRef.current?.getBoundingClientRect().top,
            },
          };
        }),
      };
    });
    setMessagesDimensions({
      width: messagesRef?.getBoundingClientRect().width,
      height: messagesRef?.getBoundingClientRect().height,
      y: event.clientY,
    });

    event.preventDefault();
  };

  return (
    <div
      {...attrs}
      ref={messageRef}
      onContextMenu={(event) => handleContextMenu(event)}
      onMouseDown={(event) => {
        setChat({
          ...chat,
          messages: chat.messages.map((m) => {
            return { ...m, contextMenu: { ...m.contextMenu, show: false } };
          }),
        });
        attrs.onMouseDown(event);
      }}
      className={`flex items-center gap-4 px-8 py-4 ${createdByLoggedInUser ? "justify-end" : ""} relative hover:bg-gray-100/50`}
    >
      <div
        className={`text-gray-400 text-xs ${!createdByLoggedInUser && "order-1"}`}
      >
        {formatTime(message.createdAt)}
      </div>
      <div
        className={`${createdByLoggedInUser ? "bg-[#7046a2] text-white" : "bg-gray-100"} rounded-md px-4 py-2 relative max-w-250`}
      >
        <div>{message.content}</div>
        <div
          className={`border-transparent border-8 absolute bottom-[50%] translate-y-[50%] ${createdByLoggedInUser ? "border-l-[#7046a2] border-l-16 -right-4" : "border-r-gray-100 border-r-16 -left-4"}`}
        ></div>
      </div>
      {renderImage ? (
        <img
          src={user.photo}
          className={`w-15 h-15 rounded-full object-cover ${!createdByLoggedInUser && "-order-1"}`}
        />
      ) : (
        <div
          className={`w-15 h-15 ${!createdByLoggedInUser && "-order-1"}`}
        ></div>
      )}
      {message.contextMenu?.show && (
        <div
          ref={contextMenuRef}
          style={{
            left: `${message.contextMenu?.x}px`,
            top: `${message.contextMenu?.y}px`,
            transform: `${flipContextMenu.x ? "translateX(-100%)" : flipContextMenu.y ? "translateY(-100%)" : ""}`,
          }}
          className={`flex flex-col gap-2 z-2 absolute bg-[#202324] text-white p-4 rounded-md [&,div]:text-nowrap`}
        >
          <button className="flex gap-2 hover:bg-white/5 px-4 py-2 rounded-md ">
            <Pencil />
            <div>Edit Message</div>
          </button>
          <button
            onMouseDown={(event) => {
              handleDeleteMessage(event);
              attrs.onMouseDown(event);
            }}
            className="text-red-400 flex gap-2 hover:bg-red-500/10 px-4 py-2 rounded-md"
          >
            <Trash />
            <div>Delete Message</div>
          </button>
        </div>
      )}
    </div>
  );
}
