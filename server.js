const express = require("express");
const cors = require("cors");
const Stripe = require("stripe");

require("dotenv").config(); // Make sure to set up your .env file

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // Add your secret key in .env

app.use(cors());
app.use(express.json());

app.post("/create-checkout-session", async (req, res) => {
  const { contractId, userId } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Contract Upgrade - Remove Watermark",
            },
            unit_amount: 100, // $1 per contract
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.CLIENT_URL}/payment-success?contractId=${contractId}&userId=${userId}`,
      cancel_url: `${process.env.CLIENT_URL}/dashboard`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Error creating Stripe session:", error);
    res.status(500).json({ error: "Failed to create payment session" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
