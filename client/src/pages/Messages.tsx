import {
  Send,
  Search,
  Trash2,
} from "lucide-react";

import {
  useEffect,
  useState,
  useRef,
} from "react";

import {
  useSearchParams,
} from "react-router-dom";

import axios from "axios";

import { socket } from "../socket";

const playNotification = () => {

  if (
    Notification.permission ===
    "granted"
  ) {

    new Notification(
      "📩 New Message",
      {
        body:
          "You received a message",
      }
    );

  }

};

const Messages = () => {

  const [searchParams] =
    useSearchParams();

  const sellerId =
    searchParams.get(
      "seller"
    );

  const productId =
    searchParams.get(
      "product"
    );

  const currentUser =
    JSON.parse(

      localStorage.getItem(
        "campuscart-user"
      ) || "{}"

    );

  const [search,setSearch] =
    useState("");

  const [message,setMessage] =
    useState("");

  const [messages,setMessages] =
    useState<any[]>([]);

  const [chats,setChats] =
    useState<any[]>([]);

  const [selectedChat,
    setSelectedChat] =
    useState<any>(null);

    const [

onlineUsers,

setOnlineUsers,

]=useState<string[]>([]);

  const bottomRef =
    useRef<HTMLDivElement>(null);

  /* INIT */

 useEffect(()=>{

fetchChats();

if(

currentUser?._id

){

socket.emit(

"user_online",

currentUser._id

);

socket.emit(

"join",

currentUser._id

);

}

if(

Notification.permission

!==

"granted"

){

Notification.requestPermission();

}

},[]);
  /* FETCH CHATS */

  const fetchChats =
    async () => {

      try {

        const token =

          localStorage.getItem(

            "token"

          );

        const res =

          await axios.get(

            "http://localhost:5000/api/messages/my-chats",

            {

              headers: {

                Authorization:

                  `Bearer ${token}`,

              },

            }

          );

        setChats(

          res.data.chats

        );

      }

      catch(error){

        console.log(error);

      }

    };

  /* AUTO OPEN CHAT */

  useEffect(() => {

    if (

      sellerId &&

      productId &&

      chats.length

    ) {

      const found =

        chats.find(

          (chat:any)=>

            chat.user._id===sellerId &&

            chat.product._id===productId

        );

     if(found){

setSelectedChat(found);

fetchMessages(

found.product._id,

found.user._id

);

}

    }

  },[

    sellerId,

    productId,

    chats,

  ]);

  /* FETCH MESSAGES */

  const fetchMessages =
    async(

      product:string,

      user:string

    )=>{

      try{

        const token=

          localStorage.getItem(

            "token"

          );

        const res=

          await axios.get(

            `http://localhost:5000/api/messages/${product}/${user}`,

            {

              headers:{

                Authorization:

                  `Bearer ${token}`,

              },

            }

          );

        setMessages(

          res.data.messages

        );
        await fetchChats();

      }

      catch(error){

        console.log(error);

      }

    };

  /* SCROLL */

  useEffect(()=>{

    bottomRef.current?.scrollIntoView({

      behavior:"smooth",

    });

  },[messages]);

  useEffect(()=>{

socket.on(

"online_users",

(data)=>{

setOnlineUsers(

data

);

}

);

return()=>{

socket.off(

"online_users"

);

};

},[]);

  /* SOCKET */
useEffect(()=>{

const handleReceive = async ()=>{

  if(selectedChat){

    await fetchMessages(

      selectedChat.product._id,

      selectedChat.user._id

    );

  }

  await fetchChats();

  playNotification();

};

socket.on(

"receive_message",

handleReceive

);

return ()=>{

socket.off(

"receive_message",

handleReceive

);

};

},[selectedChat]);

  /* OPEN CHAT */

  const openChat = async (chat:any)=>{

  setSelectedChat(chat);

  

  /* instant unread remove */

  setChats(

    (prev)=>

      prev.map(

        (item:any)=>

          item.id===chat.id

          ? {

              ...item,

              unread:0,

            }

          : item

      )

  );

  await fetchMessages(

    chat.product._id,

    chat.user._id

  );

};
  /* DELETE */

  const deleteMessage=

    async(id:string)=>{

      try{

        const token=

          localStorage.getItem(

            "token"

          );

        await axios.delete(

          `http://localhost:5000/api/messages/${id}`,

          {

            headers:{

              Authorization:

                `Bearer ${token}`,

            },

          }

        );

        if(

          selectedChat

        ){

          await fetchMessages(

            selectedChat.product._id,

            selectedChat.user._id

          );

        }

        await fetchChats();

      }

      catch(error){

        console.log(error);

      }

    };

  /* SEND */

  const sendMessage = async ()=>{

if(

!message.trim()

) return;

if(

!selectedChat

) return;

try{

const token =

localStorage.getItem(

"token"

);

const receiver =

selectedChat.user._id;

const product =

selectedChat.product._id;

const res = await axios.post(

"http://localhost:5000/api/messages",

{

receiver,

product,

text:message,

},

{

headers:{

Authorization:

`Bearer ${token}`,

},

}

);

/* ⭐ INSTANT UI */

setMessages(

(prev)=>

[

...prev,

res.data.message,

]

);

/* ⭐ CLEAR INPUT */

setMessage("");

/* ⭐ UPDATE CHAT LIST */

await fetchChats();

/* ⭐ SOCKET */

socket.emit(

"send_message",

receiver

);

}

catch(error){

console.log(error);

}

};

  const filteredChats=

    chats.filter(

      (chat:any)=>

        chat.user.name

        .toLowerCase()

        .includes(

          search.toLowerCase()

        )

    );

  return(

<div className="h-full bg-gray-100 overflow-hidden">

<div className="max-w-7xl mx-auto h-full overflow-hidden">

<div className="grid md:grid-cols-[350px_1fr] h-full">

{/* LEFT */}

<div className="bg-white border-r flex flex-col overflow-hidden">

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

value={search}

onChange={(e)=>

setSearch(

e.target.value

)

}

placeholder="Search chats..."

className="w-full border rounded-2xl pl-10 pr-4 py-3"

/>

</div>

</div>

<div className="flex-1 overflow-y-auto">

{filteredChats.map(

(chat:any)=>(

<div

key={chat.id}

onClick={()=>

openChat(chat)

}

className={`p-5 border-b cursor-pointer hover:bg-blue-50 ${
selectedChat?.id===chat.id
? "bg-blue-100"
: ""
}`}

>

<div className="flex items-center gap-2">

<h3 className="font-bold">

{chat.user.name}

</h3>

<div

className={`w-2 h-2 rounded-full ${

onlineUsers.includes(

chat.user._id

)

?

"bg-green-500"

:

"bg-gray-300"

}`}

/>

</div>

<p className="text-xs text-gray-500">

{chat.product.title}

</p>

<div className="flex justify-between">

<p className="text-sm text-gray-400 truncate">

{chat.lastMessage}

</p>

{chat.unread>0 &&(

<div className="bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">

{chat.unread}

</div>

)}

</div>

</div>

)

)}

</div>

</div>

{/* RIGHT */}

<div className="bg-white flex flex-col h-full overflow-hidden">

<div className="border-b p-5">

<h2 className="font-bold text-2xl">

{selectedChat

? selectedChat.user.name

: "Select a Chat"}

</h2>

</div>

<div className="flex-1 overflow-y-auto p-6 space-y-4">

{messages.map(

(msg:any,index)=>

{

const isMe=

(typeof msg.sender===

"string"

? msg.sender

: msg.sender?._id)

===

currentUser._id;

return(

<div

key={index}

className={`flex ${
isMe
? "justify-end"
: "justify-start"
}`}

>

<div className="relative group">

{isMe &&(

<button

onClick={()=>

deleteMessage(

msg._id

)

}

className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100"

>

<Trash2 size={14}/>

</button>

)}

<div

className={`px-5 py-3 rounded-3xl max-w-md shadow ${
isMe
? "bg-indigo-600 text-white"
: "bg-white border"
}`}

>

<p>

{msg.text}

</p>

<p className="text-xs mt-2 opacity-70">

{new Date(

msg.createdAt

).toLocaleTimeString(

[],

{

hour:"2-digit",

minute:"2-digit",

}

)}

</p>

</div>

</div>

</div>

);

}

)}

<div ref={bottomRef}/>

</div>

{selectedChat &&(

<div className="border-t p-4">

<div className="flex gap-3">

<input

value={message}

onChange={(e)=>

setMessage(

e.target.value

)

}

onKeyDown={(e)=>{

if(

e.key==="Enter"

){

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

className="bg-indigo-600 text-white px-6 rounded-2xl"

>

<Send size={20}/>

</button>

</div>

</div>

)}

</div>

</div>

</div>

</div>

);

};

export default Messages;