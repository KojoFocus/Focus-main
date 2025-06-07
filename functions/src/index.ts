import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import axios from "axios";

admin.initializeApp();

const PAYSTACK_SECRET_KEY = "sk_test_xxxxxxxxxxxxx"; // replace with your real secret key

export const verifyPayment = functions.https.onRequest(async (req, res) => {
  const { reference } = req.body;

  if (!reference) {
    res.status(400).json({ error: "Missing reference" });
    return;
  }

  try {
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = response.data.data;

    if (data.status === "success") {
      res.status(200).json({ message: "Payment verified", data });
    } else {
      res.status(400).json({ message: "Payment failed", data });
    }
  } catch (error) {
    res.status(500).json({
      error: "Verification failed",
      details: error instanceof Error ? error.message : error,
    });
  }
});
