import API from "../config/api";
import { toast } from "sonner";
import { Send, Search, Trash2, MessageCircle } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { socket } from "../socket";

const playNotification = () => {
  if (Notification.permission === "granted") {
    new Notification("📩 New Message", { body: "You received a message" });
  }
};

const Messages = () => {
  const [searchParams] = useSearchParams();
  const sellerName = searchParams.get("sellerName");
const productTitle = searchParams.get("productTitle");
  const sellerId = searchParams.get("seller");
  const productId = searchParams.get("product");

  const currentUser = JSON.parse(localStorage.getItem("campuscart-user") || "{}");

  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [chats, setChats] = useState<any[]>([]);
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchChats();
    if (currentUser?._id) {
      socket.emit("user_online", currentUser._id);
      socket.emit("join", currentUser._id);
    }
    if (Notification.permission !== "granted") Notification.requestPermission();
  }, []);

  const fetchChats = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(API.MY_CHATS, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const serverChats = res.data.chats;

       console.log("==============");
console.log("Seller ID:", sellerId);
console.log("Product ID:", productId);
console.log("API Response:", res.data);
console.log("Server Chats:", serverChats);

setChats(() => {
  if (!sellerId || !productId) return serverChats;

 const alreadyExists = serverChats.some(
  (chat: any) =>
    chat.user?._id === sellerId &&
    chat.product?._id === productId
);

  if (alreadyExists) return serverChats;

  return [
  {
  _id: `${sellerId}-${productId}`,
  id: `${sellerId}-${productId}`,
  user: {
    _id: sellerId,
    name: sellerName || "Seller",
  },
  product: {
    _id: productId,
    title: productTitle || "Product",
  },
  unread: 0,
  lastMessage: "",
},
    ...serverChats,
  ];
});

      if (sellerId && productId) {

  const found = res.data.chats.find(
  (chat: any) =>
    chat.user?._id === sellerId &&
    chat.product?._id === productId
);

  if (found) {
    setSelectedChat(found);
    fetchMessages(found.product._id, found.user._id);
  }
 else {
setSelectedChat({
  _id: `${sellerId}-${productId}`,
  id: `${sellerId}-${productId}`,
  user: {
    _id: sellerId,
    name: sellerName || "Seller",
  },
  product: {
    _id: productId,
    title: productTitle || "Product",
  },
  unread: 0,
});
  setMessages([]);
}
}
    } catch (error) { console.log(error); }
  };
useEffect(() => {
  if (!sellerId || !productId || chats.length === 0) return;

  const found = chats.find(
    (chat: any) =>
      chat.user?._id === sellerId &&
      chat.product?._id === productId
  );

  if (found) {
    setSelectedChat(found);
    fetchMessages(
      found.product._id,
      found.user._id
    );
  }
}, [chats]);

 const fetchMessages = async (product: string, user: string) => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(
     API.CONVERSATION(product, user),
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setMessages(res.data.messages);

    // ❌ fetchChats() intentionally removed
  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    socket.on("online_users", (data) => setOnlineUsers(data));
    return () => { socket.off("online_users"); };
  }, []);

  useEffect(() => {
    const handleReceive = async () => {
      if (selectedChat) await fetchMessages(selectedChat.product._id, selectedChat.user._id);
      await fetchChats();
      playNotification();
    };
    socket.on("receive_message", handleReceive);
    return () => { socket.off("receive_message", handleReceive); };
  }, [selectedChat]);

  const openChat = async (chat: any) => {
    setSelectedChat(chat);
setChats(prev =>
  prev.map((item: any) =>
    (item._id || item.id) === (chat._id || chat.id)
      ? { ...item, unread: 0 }
      : item
  )
);
    await fetchMessages(chat.product._id, chat.user._id);
  };

  const deleteMessage = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(API.DELETE_MESSAGE(id), {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (selectedChat) await fetchMessages(selectedChat.product._id, selectedChat.user._id);
      await fetchChats();
    } catch (error) { console.log(error); }
  };

  const sendMessage = async () => {
    if (!message.trim() || !selectedChat) return;
    try {
      const token = localStorage.getItem("token");
      const receiver = selectedChat.user._id;
      if (!receiver || !selectedChat.product?._id) {
  toast.error("Unable to start conversation");
  return;
}
      const product = selectedChat.product._id;
      const res = await axios.post(
      API.MESSAGES,
        { receiver, product, text: message },
        { headers: { Authorization: `Bearer ${token}` } }
      );
   setMessages(prev => [...prev, res.data.message]);
setMessage("");

const updatedChats = await axios.get(
 API.MY_CHATS,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

setChats(updatedChats.data.chats);

const latestChat = updatedChats.data.chats.find(
  (chat: any) =>
    chat.user._id === receiver &&
    chat.product._id === product
);

if (latestChat) {
  setSelectedChat({
    ...latestChat,
    id: latestChat.id || latestChat._id,
    _id: latestChat._id || latestChat.id,
  });

  await fetchMessages(
    latestChat.product._id,
    latestChat.user._id
  );
}

socket.emit("send_message", receiver);

    } catch (error) { console.log(error); }
  };
  
  console.log("Chats State:", chats);

const filteredChats = chats
  .filter((chat: any) => chat.user)
  .filter((chat: any) =>
    chat.user.name
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  const isOnline = (userId: string) => onlineUsers.includes(userId);

  return (
    <div style={{ height: "calc(100vh - 82px)", background: "#F0F2F5", display: "flex", overflow: "hidden" }}>
      <div style={{ maxWidth: "1360px", width: "100%", margin: "0 auto", display: "grid", gridTemplateColumns: "360px 1fr", height: "100%" }}>

        {/* LEFT SIDEBAR */}
        <div style={{ background: "#fff", display: "flex", flexDirection: "column", borderRight: "1px solid #E5E7EB", overflow: "hidden" }}>

          {/* Header */}
          <div style={{ padding: "20px 20px 16px", borderBottom: "1px solid #F3F4F6" }}>
            <h1 style={{ fontSize: "22px", fontWeight: 900, color: "#111827", margin: "0 0 14px" }}>Messages</h1>
            <div style={{ position: "relative" }}>
              <Search size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#9CA3AF" }} />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search conversations..."
                style={{
                  width: "100%", height: "38px", borderRadius: "10px",
                  border: "1.5px solid #E5E7EB", paddingLeft: "36px", paddingRight: "12px",
                  fontSize: "13px", outline: "none", background: "#F9FAFB",
                  boxSizing: "border-box", fontFamily: "inherit",
                }}
              />
            </div>
          </div>

          {/* Chat list */}
          <div style={{ flex: 1, overflowY: "auto" }}>
            {filteredChats.length === 0 && (
              <div style={{ textAlign: "center", padding: "48px 20px" }}>
                <MessageCircle size={40} style={{ color: "#D1D5DB", margin: "0 auto 12px" }} />
                <p style={{ color: "#9CA3AF", fontSize: "14px" }}>No conversations yet</p>
              </div>
            )}
            {filteredChats.map((chat: any) => {
const currentId = selectedChat?._id || selectedChat?.id;
const chatId = chat._id || chat.id;

const isSelected = currentId === chatId;

const online = isOnline(chat.user._id);
              return (
                <div
               key={chat._id || chat.id}
                  onClick={() => openChat(chat)}
                  style={{
                    padding: "14px 20px", cursor: "pointer", borderBottom: "1px solid #F9FAFB",
                    background: isSelected ? "#FFF8EA" : "#fff",
                    borderLeft: isSelected ? "3px solid #F3A847" : "3px solid transparent",
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={e => { if (!isSelected) (e.currentTarget as HTMLDivElement).style.background = "#F9FAFB"; }}
                  onMouseLeave={e => { if (!isSelected) (e.currentTarget as HTMLDivElement).style.background = "#fff"; }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ position: "relative", flexShrink: 0 }}>
                      <div style={{
                        width: "44px", height: "44px", borderRadius: "50%",
                        background: "#EEF2FF", display: "flex", alignItems: "center", justifyContent: "center",
                        fontWeight: 700, fontSize: "16px", color: "#4F46E5",
                      }}>
                        {chat.user.name.charAt(0).toUpperCase()}
                      </div>
                      <div style={{
                        position: "absolute", bottom: "1px", right: "1px",
                        width: "10px", height: "10px", borderRadius: "50%",
                        background: online ? "#22C55E" : "#D1D5DB",
                        border: "2px solid #fff",
                      }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontWeight: 700, fontSize: "14px", color: "#111827" }}>{chat.user.name}</span>
                        {chat.unread > 0 && (
                          <span style={{
                            background: "#F3A847", color: "#111", fontWeight: 700,
                            fontSize: "11px", borderRadius: "999px", padding: "2px 7px", flexShrink: 0,
                          }}>{chat.unread}</span>
                        )}
                      </div>
                      <p style={{ fontSize: "12px", color: "#9CA3AF", margin: "2px 0 0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        🏷️ {chat.product.title}
                      </p>
                      <p style={{ fontSize: "12px", color: "#6B7280", margin: "2px 0 0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {chat.lastMessage || "Start a conversation"}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT — Chat Area */}
        <div style={{ display: "flex", flexDirection: "column", background: "#F0F2F5", overflow: "hidden" }}>

          {!selectedChat ? (
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "#FFF3DB", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                <MessageCircle size={36} style={{ color: "#F3A847" }} />
              </div>
              <h2 style={{ fontWeight: 800, fontSize: "20px", color: "#374151", margin: 0 }}>Select a conversation</h2>
              <p style={{ color: "#9CA3AF", marginTop: "8px", fontSize: "14px" }}>Choose a chat from the left to start messaging</p>
            </div>
          ) : (
            <>
              {/* Chat Header */}
              <div style={{
                background: "#fff", padding: "14px 24px",
                borderBottom: "1px solid #E5E7EB",
                display: "flex", alignItems: "center", gap: "14px",
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
              }}>
                <div style={{ position: "relative" }}>
                  <div style={{
                    width: "44px", height: "44px", borderRadius: "50%",
                    background: "#EEF2FF", display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: 700, fontSize: "16px", color: "#4F46E5",
                  }}>
                    {selectedChat.user?.name?.charAt(0) || "?".toUpperCase()}
                  </div>
                  <div style={{
                    position: "absolute", bottom: "1px", right: "1px",
                    width: "10px", height: "10px", borderRadius: "50%",
                    background: isOnline(selectedChat.user._id) ? "#22C55E" : "#D1D5DB",
                    border: "2px solid #fff",
                  }} />
                </div>
                <div>
                  <h2 style={{ fontWeight: 800, fontSize: "16px", color: "#111827", margin: 0 }}>
                    {selectedChat.user.name}
                  </h2>
                  <p style={{ fontSize: "12px", color: isOnline(selectedChat.user._id) ? "#22C55E" : "#9CA3AF", margin: "2px 0 0", fontWeight: 600 }}>
                    {isOnline(selectedChat.user._id) ? "● Online" : "● Offline"}
                  </p>
                </div>
                <div style={{
                  marginLeft: "auto", background: "#FFF3DB", borderRadius: "8px",
                  padding: "6px 12px", fontSize: "12px", fontWeight: 600, color: "#C47F00",
                }}>
                  🏷️ {selectedChat.product.title}
                </div>
              </div>

              {/* Messages */}
              <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px", display: "flex", flexDirection: "column", gap: "6px" }}>
                {messages.map((msg: any, index) => {
                  const isMe = (typeof msg.sender === "string" ? msg.sender : msg.sender?._id) === currentUser._id;
                  const timeStr = new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

                  return (
                    <div key={index} style={{ display: "flex", justifyContent: isMe ? "flex-end" : "flex-start", marginBottom: "2px" }}>
                      <div style={{ position: "relative" }} className="msg-group">
                        {isMe && (
                          <button
                            onClick={() => deleteMessage(msg._id)}
                            style={{
                              position: "absolute", top: "-8px", right: "-8px",
                              width: "20px", height: "20px", borderRadius: "50%",
                              background: "#EF4444", border: "none", cursor: "pointer",
                              display: "none", alignItems: "center", justifyContent: "center",
                              color: "#fff", zIndex: 10,
                            }}
                            className="delete-btn"
                          >
                            <Trash2 size={10} />
                          </button>
                        )}
                        <div style={{
                          padding: "10px 14px", borderRadius: isMe ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                          maxWidth: "360px", wordBreak: "break-word",
                          background: isMe ? "#232F3E" : "#fff",
                          color: isMe ? "#fff" : "#111827",
                          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                          fontSize: "14px", lineHeight: 1.5,
                        }}>
                          <p style={{ margin: 0 }}>{msg.text}</p>
                          <p style={{ fontSize: "11px", margin: "4px 0 0", opacity: 0.6, textAlign: "right" }}>{timeStr}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <div style={{ background: "#fff", padding: "14px 20px", borderTop: "1px solid #E5E7EB" }}>
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <input
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    onKeyDown={e => { if (e.key === "Enter") sendMessage(); }}
                    placeholder="Type a message..."
                    style={{
                      flex: 1, height: "46px", borderRadius: "12px",
                      border: "1.5px solid #E5E7EB", paddingLeft: "16px", paddingRight: "16px",
                      fontSize: "14px", outline: "none", background: "#F9FAFB",
                      fontFamily: "inherit",
                    }}
                    onFocus={e => e.target.style.borderColor = "#F3A847"}
                    onBlur={e => e.target.style.borderColor = "#E5E7EB"}
                  />
                  <button
                    onClick={sendMessage}
                    style={{
                      width: "46px", height: "46px", borderRadius: "12px",
                      background: "#F3A847", border: "none", cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "background 0.2s", flexShrink: 0,
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = "#E89D30")}
                    onMouseLeave={e => (e.currentTarget.style.background = "#F3A847")}
                  >
                    <Send size={18} style={{ color: "#111" }} />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <style>{`
        .msg-group:hover .delete-btn { display: flex !important; }
      `}</style>
    </div>
  );
};

export default Messages;