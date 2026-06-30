import { subscribeUserService } from "../services/subscriberService.js";

export const subscribeUser = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email address",
      });
    }

    const subscriber = await subscribeUserService(email);

    res.status(201).json({
      message: "Subscribed successfully",
      subscriber,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};
