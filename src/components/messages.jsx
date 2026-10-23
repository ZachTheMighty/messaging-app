import { useEffect, useRef } from "react";
import Message from "./message.jsx";
export default function Messages({ chat, setChat }) {
  const messagesRef = useRef(null);
  useEffect(() => {
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [chat.id]);

  return (
    <div ref={messagesRef} className="flex-1 flex flex-col overflow-scroll">
      {chat.messages.length === 0
        ? "You have no messages."
        : chat.messages
            .sort((a, b) => a.id - b.id)
            .map((message) => (
              <Message
                key={message.id}
                message={message}
                chat={chat}
                setChat={setChat}
                messagesRef={messagesRef.current}
              />
            ))}
    </div>
  );
}
