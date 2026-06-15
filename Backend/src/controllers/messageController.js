import Message from "../models/Message.js";

export const sendMessage = async (
  req,
  res
) => {
  try {
    const {
      receiver,
      product,
      text,
    } = req.body;

    const message =
      await Message.create({
        sender: req.user.id,
        receiver,
        product,
        text,
      });

    res.status(201).json({
      success: true,
      message,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMessages =
  async (req, res) => {
    try {
      const {
        productId,
        userId,
      } = req.params;

      const messages =
        await Message.find({
          product: productId,
          $or: [
            {
              sender: req.user.id,
              receiver: userId,
            },
            {
              sender: userId,
              receiver: req.user.id,
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
            createdAt: 1,
          });

      res.status(200).json({
        success: true,
        messages,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };