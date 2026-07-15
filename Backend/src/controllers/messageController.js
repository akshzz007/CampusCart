import Message from "../models/Message.js";

/* ================= SEND MESSAGE ================= */

export const sendMessage = async (req, res) => {

  try {

    const { receiver, product, text } = req.body;

    const message = await Message.create({

      sender: req.user.id,

      receiver,

      product,

      text,

      isDelivered: true,

      isRead: false,

    });

    const populatedMessage = await Message.findById(

      message._id

    )

    .populate(

      "sender",

      "name email"

    )

    .populate(

      "receiver",

      "name email"

    )

    .populate(

      "product",

      "title"

    );

    return res.status(201).json({

      success: true,

      message: populatedMessage,

    });

  }

  catch(error){

    console.log(

      "SEND MESSAGE ERROR:",

      error

    );

    return res.status(500).json({

      success:false,

      message:error.message,

    });

  }

};

/* ================= GET CONVERSATION ================= */

export const getMessages = async (

  req,

  res

)=>{

  try{

    const {

      productId,

      userId,

    } = req.params;

    /* MARK AS READ */

    await Message.updateMany(

      {

        sender:userId,

        receiver:req.user.id,

        product:productId,

        isRead:false,

      },

      {

        isRead:true,

      }

    );

    const messages = await Message.find({

      product:productId,

      $or:[

        {

          sender:req.user.id,

          receiver:userId,

        },

        {

          sender:userId,

          receiver:req.user.id,

        },

      ],

    })

    .populate(

      "sender",

      "name email"

    )

    .populate(

      "receiver",

      "name email"

    )

    .sort({

      createdAt:1,

    });

    return res.status(200).json({

      success:true,

      messages,

    });

  }

  catch(error){

    console.log(

      "GET MESSAGES ERROR:",

      error

    );

    return res.status(500).json({

      success:false,

      message:error.message,

    });

  }

};

/* ================= GET MY CHATS ================= */

export const getMyChats = async (

  req,

  res

)=>{

  try{

    const currentUser =

      req.user.id;

    const messages = await Message.find({

      $or:[

        {

          sender:currentUser,

        },

        {

          receiver:currentUser,

        },

      ],

    })

    .populate(

      "sender",

      "name"

    )

    .populate(

      "receiver",

      "name"

    )

    .populate(

      "product",

      "title"

    )

    .sort({

      createdAt:-1,

    });

    const seen = new Set();

    const chats = [];

   for (const msg of messages) {

  // Skip broken references
  if (!msg.sender || !msg.receiver || !msg.product) {
    continue;
  }

  const otherUser =
    msg.sender._id.toString() === currentUser
      ? msg.receiver
      : msg.sender;

  if (!otherUser) {
    continue;
  }

  const key = `${otherUser._id}-${msg.product._id}`;

  if (seen.has(key)) {
    continue;
  }

  seen.add(key);

  const unread = await Message.countDocuments({
    sender: otherUser._id,
    receiver: currentUser,
    product: msg.product._id,
    isRead: false,
  });

  chats.push({
    id: key,
    user: otherUser,
    product: msg.product,
    lastMessage: msg.text,
    lastMessageTime: msg.createdAt,
    unread,
  });
}

    return res.status(200).json({

      success:true,

      chats,

    });

  }

  catch(error){

    console.log(

      "GET CHATS ERROR:",

      error

    );

    return res.status(500).json({

      success:false,

      message:error.message,

    });

  }

};

/* ================= DELETE MESSAGE ================= */

export const deleteMessage = async (

  req,

  res

)=>{

  try{

    const { id } = req.params;

    const message =

    await Message.findById(

      id

    );

    if(

      !message

    ){

      return res.status(404).json({

        success:false,

        message:

        "Message not found",

      });

    }

    if(

      message.sender.toString()

      !==

      req.user.id

    ){

      return res.status(403).json({

        success:false,

        message:

        "Unauthorized",

      });

    }

    await Message.findByIdAndDelete(

      id

    );

    return res.status(200).json({

      success:true,

      message:

      "Message deleted",

    });

  }

  catch(error){

    console.log(

      "DELETE ERROR:",

      error

    );

    return res.status(500).json({

      success:false,

      message:error.message,

    });

  }

};