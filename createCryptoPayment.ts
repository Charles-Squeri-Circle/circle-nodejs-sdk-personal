import { Circle, CircleEnvironments } from "@circle-fin/circle-sdk";

// Initialize API driver
const circle = new Circle(
  "<your-api-key>",
  CircleEnvironments.sandbox // API base url
);

async function createCryptoPayment() {
  const createCryptoPaymentRes =
    await circle.paymentIntents.createPaymentIntent({
      idempotencyKey: "5c6e9b91-6563-47ec-8c6d-0ce1103c50b3",
      amount: {
        amount: "3.14",
        currency: "USD",
      },
      settlementCurrency: "USD",
      paymentMethods: [
        {
          chain: "ETH",
          type: "blockchain",
        },
      ],
    });
  console.log(createCryptoPaymentRes);
}

createCryptoPayment();
