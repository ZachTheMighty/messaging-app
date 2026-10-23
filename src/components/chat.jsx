import { SendHorizonal } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Context } from "./context.jsx";
import Messages from "./messages.jsx";

export default function Chat() {
  const { userId } = useParams();
  const user = useContext(Context).users.find((user) => user.id === +userId);

  const { chats, setChats } = useContext(Context);
  const [chat, setChat] = useState(null);
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return () => navigate("/dashboard/chats");
    setChat(chats.find((chat) => chat.users.find((u) => u.id === user.id)));
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    await fetch(`https://message-api-264x.onrender.com/chats/${chat?.id ?? -1}/messages`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ userId: user.id, content }),
    })
      .then((response) => response.json())
      .then((data) => {
        setChat(data);
        setChats(chats.map((c) => (c.id === chat.id ? data : c)));
      })
      .catch((error) => console.error(error));
    setContent("");
  };
  return (
    <>
      <div className="flex-1 flex flex-col overflow-scroll">
        {chat && <Messages chat={chat} setChat={setChat} />}
        <form
          onSubmit={(event) => handleSubmit(event)}
          className="w-full lg:w-auto min-h-20 flex items-center border-t border-black/10 border-r"
        >
          <input
            placeholder="Type your message here..."
            className="flex-1 px-4 focus:outline-0 h-full"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            name="content"
          />
          <button className="text-purple-900 mr-4 hover:text-purple-800 active:text-purple-900 hover:cursor-pointer">
            <SendHorizonal />
          </button>
        </form>
      </div>
    </>
  );
}
