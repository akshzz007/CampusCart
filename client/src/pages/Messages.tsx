import { Send, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

import { socket } from "../socket";

const Messages = () => {
  const [searchParams] =
    useSearchParams();

  const sellerId =
    searchParams.get("seller");

  const productId =
    searchParams.get("product");

  const currentUser = JSON.parse(
    localStorage.getItem(
      "campuscart-user"
    ) || "{}"
  );



  const chats = [
    {
      id: 1,
      name: "Seller",
      product: "CampusCart Product",
      lastMessage:
        "Start chatting",
    },
  ];

  const [selectedChat, setSelectedChat] =
    useState(chats[0]);

  const [message, setMessage] =
    useState("");

  const [messages, setMessages] =
    useState<any[]>([]);

  useEffect(() => {
    if (
      sellerId &&
      productId
    ) {
      fetchMessages();
    }
  }, [sellerId, productId]);

  const fetchMessages =
    async () => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await axios.get(
            `http://localhost:5000/api/messages/${productId}/${sellerId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        setMessages(
          res.data.messages
        );
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    socket.on(
      "receive_message",
      (data) => {
        setMessages(
          (prev) => [
            ...prev,
            data,
          ]
        );
      }
    );

    return () => {
      socket.off(
        "receive_message"
      );
    };
  }, []);

 const sendMessage = async () => {

  if (
    !message.trim() ||
    !sellerId ||
    !productId
  ) return;

  try {

    const token =
      localStorage.getItem(
        "token"
      );

    const res =
      await axios.post(
        "http://localhost:5000/api/messages",

        {
          receiver: sellerId,

          product: productId,

          text: message,
        },

        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    socket.emit(
      "send_message",
      res.data.message
    );

    setMessages(
      (prev) => [
        ...prev,
        res.data.message,
      ]
    );

    setMessage("");

  } catch (error) {

    console.log(error);

  }
};
  return (
    <div className="h-[calc(100vh-80px)] bg-gray-100">
      <div className="max-w-7xl mx-auto h-full">

        <div className="grid md:grid-cols-[350px_1fr] h-full">

          {/* SIDEBAR */}

          <div className="bg-white border-r flex flex-col">

            <div className="p-5 border-b">

              <h1 className="text-3xl font-bold">
                Messages
              </h1>

              <div className="relative mt-4">

                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  placeholder="Search chats..."
                  className="w-full border rounded-2xl pl-10 pr-4 py-3"
                />

              </div>

            </div>

            <div className="flex-1 overflow-y-auto">

              {chats.map(
                (chat) => (
                  <div
                    key={chat.id}
                    onClick={() =>
                      setSelectedChat(
                        chat
                      )
                    }
                    className={`p-5 border-b cursor-pointer transition ${
                      selectedChat.id ===
                      chat.id
                        ? "bg-blue-50"
                        : "hover:bg-gray-50"
                    }`}
                  >

                    <div className="flex items-center gap-3">

                      <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-700">
                        {
                          chat.name.charAt(
                            0
                          )
                        }
                      </div>

                      <div>

                        <h3 className="font-semibold">
                          {chat.name}
                        </h3>

                        <p className="text-xs text-gray-500">
                          {chat.product}
                        </p>

                        <p className="text-sm text-gray-400 mt-1">
                          {
                            chat.lastMessage
                          }
                        </p>

                      </div>

                    </div>

                  </div>
                )
              )}

            </div>

          </div>

          {/* CHAT */}

          <div className="bg-white flex flex-col">

            <div className="border-b p-5">

              <h2 className="font-bold text-xl">
                Chat
              </h2>

            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">

              {messages.length ===
              0 ? (
                <div className="flex justify-center items-center h-full text-gray-400">
                  Start a conversation 👋
                </div>
              ) : (
          messages.map(
  (
    msg,
    index
  ) => {
    const isMe =
      (typeof msg.sender ===
      "string"
        ? msg.sender
        : msg.sender?._id) ===
      currentUser._id;

    return (
      <div
        key={index}
        className={`flex ${
          isMe
            ? "justify-end"
            : "justify-start"
        }`}
      >
        <div
          className={`px-5 py-3 rounded-2xl max-w-md ${
            isMe
              ? "bg-indigo-600 text-white"
              : "bg-white border"
          }`}
        >
          <p>
            {msg.text}
          </p>

          <p className="text-xs opacity-70 mt-1">
            {new Date(
              msg.createdAt
            ).toLocaleTimeString()}
          </p>
        </div>
      </div>
    );
  }
)
              )}

            </div>

            <div className="border-t bg-white p-4">

              <div className="flex gap-3">

                <input
                  value={message}
                  onChange={(e) =>
                    setMessage(
                      e.target.value
                    )
                  }
                  onKeyDown={(
                    e
                  ) => {
                    if (
                      e.key ===
                      "Enter"
                    ) {
                      sendMessage();
                    }
                  }}
                  placeholder="Type a message..."
                  className="flex-1 border rounded-2xl px-5 py-3"
                />

                <button
                  onClick={
                    sendMessage
                  }
                  className="bg-indigo-600 text-white px-6 rounded-2xl hover:bg-indigo-700"
                >

                  <Send
                    size={20}
                  />

                </button>

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Messages;